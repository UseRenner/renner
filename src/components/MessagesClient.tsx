"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  task_id: string | null;
  body: string;
  sent_date: string;
  is_read: boolean;
};

type UserSummary = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
};

type TaskSummary = {
  id: string;
  title: string;
};

type Conversation = {
  key: string;
  otherUserId: string;
  taskId: string | null;
  messages: Message[];
};

function conversationKey(otherUserId: string, taskId: string | null) {
  return `${otherUserId}::${taskId ?? "none"}`;
}

function nameFor(user: UserSummary | undefined) {
  if (!user) return "Unknown";
  return (
    user.display_name ??
    [user.first_name, user.last_name].filter(Boolean).join(" ") ??
    "Unknown"
  );
}

function initialsFor(user: UserSummary | undefined) {
  const name = nameFor(user) || "?";
  const parts = name.trim().split(/\s+/);
  return (
    ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? ""))
      .toUpperCase()
      .slice(0, 2) || "?"
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  if (sameDay)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function MessagesClient({
  userId,
  initialWith,
  initialTask,
}: {
  userId: string;
  initialWith: string | null;
  initialTask: string | null;
}) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Record<string, UserSummary>>({});
  const [tasks, setTasks] = useState<Record<string, TaskSummary>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  // Initial load and seed for deep-linked conversation.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data: msgs, error: msgsError } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order("sent_date", { ascending: true });

      if (cancelled) return;
      if (msgsError) {
        setError(msgsError.message);
        setLoading(false);
        return;
      }

      const list = (msgs ?? []) as Message[];
      setMessages(list);

      const otherIds = new Set<string>();
      const taskIds = new Set<string>();
      for (const m of list) {
        const otherId = m.sender_id === userId ? m.recipient_id : m.sender_id;
        otherIds.add(otherId);
        if (m.task_id) taskIds.add(m.task_id);
      }

      if (initialWith) otherIds.add(initialWith);
      if (initialTask) taskIds.add(initialTask);

      const [usersRes, tasksRes] = await Promise.all([
        otherIds.size > 0
          ? supabase
              .from("users")
              .select("id, display_name, first_name, last_name")
              .in("id", Array.from(otherIds))
          : Promise.resolve({ data: [] }),
        taskIds.size > 0
          ? supabase
              .from("tasks")
              .select("id, title")
              .in("id", Array.from(taskIds))
          : Promise.resolve({ data: [] }),
      ]);

      if (cancelled) return;

      const userMap: Record<string, UserSummary> = {};
      for (const u of (usersRes.data as UserSummary[]) ?? []) userMap[u.id] = u;
      setUsers(userMap);

      const taskMap: Record<string, TaskSummary> = {};
      for (const t of (tasksRes.data as TaskSummary[]) ?? []) taskMap[t.id] = t;
      setTasks(taskMap);

      const initialKey = initialWith
        ? conversationKey(initialWith, initialTask ?? null)
        : list.length > 0
          ? (() => {
              const last = list[list.length - 1];
              const otherId =
                last.sender_id === userId ? last.recipient_id : last.sender_id;
              return conversationKey(otherId, last.task_id);
            })()
          : null;
      setActiveKey(initialKey);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase, userId, initialWith, initialTask]);

  // Real-time subscription for INSERTs.
  useEffect(() => {
    const channel = supabase
      .channel("messages-stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const msg = payload.new as Message;
          if (msg.sender_id !== userId && msg.recipient_id !== userId) return;
          setMessages((prev) =>
            prev.some((m) => m.id === msg.id) ? prev : [...prev, msg],
          );
          const otherId =
            msg.sender_id === userId ? msg.recipient_id : msg.sender_id;
          if (!users[otherId]) {
            const { data } = await supabase
              .from("users")
              .select("id, display_name, first_name, last_name")
              .eq("id", otherId)
              .maybeSingle();
            if (data) {
              setUsers((prev) => ({
                ...prev,
                [otherId]: data as UserSummary,
              }));
            }
          }
          if (msg.task_id && !tasks[msg.task_id]) {
            const { data } = await supabase
              .from("tasks")
              .select("id, title")
              .eq("id", msg.task_id)
              .maybeSingle();
            if (data) {
              setTasks((prev) => ({
                ...prev,
                [msg.task_id as string]: data as TaskSummary,
              }));
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, users, tasks]);

  const conversations = useMemo<Conversation[]>(() => {
    const grouped = new Map<string, Conversation>();
    for (const msg of messages) {
      const otherId =
        msg.sender_id === userId ? msg.recipient_id : msg.sender_id;
      const key = conversationKey(otherId, msg.task_id);
      const existing = grouped.get(key);
      if (existing) existing.messages.push(msg);
      else
        grouped.set(key, {
          key,
          otherUserId: otherId,
          taskId: msg.task_id,
          messages: [msg],
        });
    }

    if (initialWith) {
      const key = conversationKey(initialWith, initialTask ?? null);
      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          otherUserId: initialWith,
          taskId: initialTask,
          messages: [],
        });
      }
    }

    const list = Array.from(grouped.values());
    list.sort((a, b) => {
      const ax = a.messages.at(-1)?.sent_date ?? "0";
      const bx = b.messages.at(-1)?.sent_date ?? "0";
      return bx.localeCompare(ax);
    });
    return list;
  }, [messages, userId, initialWith, initialTask]);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.key === activeKey) ?? null,
    [conversations, activeKey],
  );

  // Auto-scroll the thread when the active conversation gains messages.
  useEffect(() => {
    const node = threadRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [activeConversation?.messages.length, activeKey]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!activeConversation) return;
    const body = draft.trim();
    if (!body) return;
    setSending(true);
    setError(null);

    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      sender_id: userId,
      recipient_id: activeConversation.otherUserId,
      task_id: activeConversation.taskId,
      body,
      sent_date: new Date().toISOString(),
      is_read: false,
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft("");

    const { data, error: insertError } = await supabase
      .from("messages")
      .insert({
        sender_id: userId,
        recipient_id: activeConversation.otherUserId,
        task_id: activeConversation.taskId,
        body,
      })
      .select("*")
      .single();

    if (insertError) {
      setError(insertError.message);
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    } else if (data) {
      const inserted = data as Message;
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? inserted : m)),
      );
    }
    setSending(false);
  }

  return (
    <div
      className="card"
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        overflow: "hidden",
      }}
    >
      <ConversationSidebar
        conversations={conversations}
        users={users}
        tasks={tasks}
        activeKey={activeKey}
        onSelect={setActiveKey}
        loading={loading}
      />
      <ThreadPanel
        conversation={activeConversation}
        otherUser={
          activeConversation
            ? users[activeConversation.otherUserId]
            : undefined
        }
        task={
          activeConversation?.taskId
            ? tasks[activeConversation.taskId]
            : undefined
        }
        userId={userId}
        draft={draft}
        setDraft={setDraft}
        onSend={handleSend}
        sending={sending}
        error={error}
        threadRef={threadRef}
      />
    </div>
  );
}

function ConversationSidebar({
  conversations,
  users,
  tasks,
  activeKey,
  onSelect,
  loading,
}: {
  conversations: Conversation[];
  users: Record<string, UserSummary>;
  tasks: Record<string, TaskSummary>;
  activeKey: string | null;
  onSelect: (key: string) => void;
  loading: boolean;
}) {
  return (
    <div
      style={{
        borderRight: "1px solid #dce0e5",
        backgroundColor: "#fbfbfc",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "20px 20px 12px",
          borderBottom: "1px solid #eaedf0",
        }}
      >
        <div className="micro-label">Conversations</div>
      </div>

      {loading ? (
        <p
          style={{
            padding: "20px",
            color: "#7d8da0",
            fontSize: "13px",
          }}
        >
          Loading…
        </p>
      ) : conversations.length === 0 ? (
        <p
          style={{
            padding: "20px",
            color: "#7d8da0",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          No conversations yet. Message a Renner from a task or applicant
          page to get started.
        </p>
      ) : (
        <ul style={{ padding: "8px 0" }}>
          {conversations.map((conv) => {
            const other = users[conv.otherUserId];
            const task = conv.taskId ? tasks[conv.taskId] : undefined;
            const last = conv.messages.at(-1);
            const active = activeKey === conv.key;
            return (
              <li key={conv.key}>
                <button
                  type="button"
                  className="conversation-row"
                  data-active={active ? "true" : "false"}
                  onClick={() => onSelect(conv.key)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 20px",
                    borderLeft: active
                      ? "3px solid #0d0f12"
                      : "3px solid transparent",
                    backgroundColor: active ? "#f6f7f9" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      style={{
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#0d0f12",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {nameFor(other)}
                    </span>
                    {last && (
                      <span
                        style={{
                          fontFamily:
                            "var(--font-inter), ui-sans-serif, system-ui",
                          fontSize: "11px",
                          color: "#7d8da0",
                          flexShrink: 0,
                        }}
                      >
                        {formatTimestamp(last.sent_date)}
                      </span>
                    )}
                  </div>
                  {task && (
                    <div
                      style={{
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui",
                        fontSize: "11px",
                        color: "#647589",
                        marginTop: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Re: {task.title}
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                      marginTop: "4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {last?.body ?? "No messages yet"}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ThreadPanel({
  conversation,
  otherUser,
  task,
  userId,
  draft,
  setDraft,
  onSend,
  sending,
  error,
  threadRef,
}: {
  conversation: Conversation | null;
  otherUser: UserSummary | undefined;
  task: TaskSummary | undefined;
  userId: string;
  draft: string;
  setDraft: (v: string) => void;
  onSend: (e: React.FormEvent) => void;
  sending: boolean;
  error: string | null;
  threadRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  if (!conversation) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ color: "#7d8da0", fontSize: "14px", padding: "32px" }}
      >
        Select a conversation to start messaging.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100%",
        backgroundColor: "#fbfbfc",
      }}
    >
      <header
        style={{
          padding: "20px 28px",
          borderBottom: "1px solid #eaedf0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            backgroundColor: "#0d0f12",
            color: "#fbfbfc",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {initialsFor(otherUser)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "15px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            {nameFor(otherUser)}
          </div>
          {task && (
            <Link
              href={`/tasks/${task.id}`}
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#647589",
                textDecoration: "none",
              }}
            >
              Re: {task.title}
            </Link>
          )}
        </div>
      </header>

      <div
        ref={threadRef}
        style={{
          overflowY: "auto",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {conversation.messages.length === 0 ? (
          <p
            style={{
              color: "#7d8da0",
              fontSize: "13px",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            Send the first message to start the conversation.
          </p>
        ) : (
          conversation.messages.map((m) => {
            const sent = m.sender_id === userId;
            return (
              <div
                key={m.id}
                style={{
                  alignSelf: sent ? "flex-end" : "flex-start",
                  maxWidth: "70%",
                  backgroundColor: sent ? "#0d0f12" : "#fbfbfc",
                  color: sent ? "#fbfbfc" : "#0d0f12",
                  border: sent ? "1px solid #0d0f12" : "1px solid #dce0e5",
                  borderRadius: "14px",
                  padding: "10px 14px",
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  lineHeight: 1.45,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.body}
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "10px",
                    color: sent ? "#a7b2be" : "#7d8da0",
                    marginTop: "4px",
                    textAlign: sent ? "right" : "left",
                  }}
                >
                  {formatTimestamp(m.sent_date)}
                </div>
              </div>
            );
          })
        )}
      </div>

      <form
        onSubmit={onSend}
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #eaedf0",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          className="input"
          placeholder="Write a message…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          style={{ flex: 1 }}
          disabled={sending}
        />
        <button
          type="submit"
          className="btn-dark"
          disabled={sending || !draft.trim()}
          style={{ width: "auto", padding: "10px 18px" }}
        >
          Send
        </button>
        {error && (
          <p
            style={{
              color: "#c0392b",
              fontSize: "12px",
              alignSelf: "center",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
