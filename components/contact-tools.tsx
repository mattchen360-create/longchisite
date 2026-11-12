"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Send,
  X,
} from "lucide-react";
import { directContact, socialProfiles } from "@/content/contact";
import { track } from "@/lib/tracking";

export function WhatsAppIcon({ size = 25 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.4 11.7a8.4 8.4 0 0 1-12.5 7.4L3 20.5l1.4-4.7A8.4 8.4 0 1 1 20.4 11.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 7.5 1.3 2.7-.9.9c.7 1.5 1.6 2.4 3.1 3.1l.9-.9 2.7 1.3c.2.1.3.4.2.6-.4 1.2-1.4 1.6-2.6 1.2-3.7-1-6.6-3.9-7.1-6.4-.2-1 .3-2.2 1.2-2.7.5-.3 1-.2 1.2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function WeChatIcon({ size = 25 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 26" aria-hidden="true">
      <path
        d="M17 13.5c0 4-3.7 7-8 7a11 11 0 0 1-2.9-.4L2 22l1.1-3.6C1.2 17 .2 15.4.2 13.5c0-4 3.7-7.1 8.4-7.1S17 9.5 17 13.5Z"
        fill="currentColor"
        transform="translate(1 -4)"
      />
      <path
        d="M27 17c0 3.4-3.2 6-7.1 6a9 9 0 0 1-2.5-.3l-3.5 1.7 1-3.1C13 20.2 12 18.7 12 17c0-3.4 3.3-6 7.5-6S27 13.6 27 17Z"
        fill="currentColor"
        stroke="var(--contact-icon-bg,white)"
        strokeWidth="1.5"
      />
      <g fill="var(--contact-icon-bg,white)">
        <circle cx="6.5" cy="8" r="1" />
        <circle cx="12.3" cy="8" r="1" />
        <circle cx="17" cy="16" r=".9" />
        <circle cx="22" cy="16" r=".9" />
      </g>
    </svg>
  );
}
function SocialIcon({ platform }: { platform: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      {platform === "youtube" ? (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="m10 9 6 3-6 3Z" fill="currentColor" stroke="none" />
        </>
      ) : platform === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      ) : platform === "linkedin" ? (
        <>
          <path d="M5 9v11M10 20V9h4v2c1-3 6-3 6 2v7M14 12v8" strokeWidth="3" />
          <circle cx="5" cy="4.5" r="1.8" fill="currentColor" stroke="none" />
        </>
      ) : (
        <path
          d="M14 22V13h3l.5-4H14V6c0-1 .5-2 2-2h2V1h-3c-4 0-5 2-5 5v3H7v4h3v9"
          fill="currentColor"
          stroke="none"
        />
      )}
    </svg>
  );
}
export function SocialLinks({ className = "" }: { className?: string }) {
  if (!socialProfiles.length) return null;
  return (
    <div
      className={`contact-socials ${className}`}
      aria-label="LONGCHI social profiles"
    >
      {socialProfiles.map((s) => (
        <a
          key={s.platform}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.label} (opens in a new tab)`}
          onClick={() => track("social_click", { platform: s.platform })}
        >
          <SocialIcon platform={s.platform} />
          <span>{s.label}</span>
        </a>
      ))}
    </div>
  );
}
export function WeChatButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("longchi:open-wechat"))}
    >
      <WeChatIcon size={20} />
      <span>WeChat</span>
    </button>
  );
}
export function ContactTools() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const open = () => {
      if (!dialog.current?.open) {
        setCopied(false);
        dialog.current?.showModal();
        track("contact_click", {
          channel: "wechat",
          placement: "contact_tools",
        });
      }
    };
    const scroll = () => setScrolled(window.scrollY > 500);
    scroll();
    window.addEventListener("longchi:open-wechat", open);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("longchi:open-wechat", open);
      window.removeEventListener("scroll", scroll);
      clearTimeout(timer.current);
    };
  }, []);
  if (path.startsWith("/admin")) return null;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(directContact.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <aside className="contact-tools" aria-label="Quick contact">
        <div className="contact-tools-main">
          <a
            className="contact-tool contact-whatsapp"
            href={directContact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp (opens in a new tab)"
            onClick={() =>
              track("contact_click", {
                channel: "whatsapp",
                placement: "contact_tools",
              })
            }
          >
            <WhatsAppIcon />
            <span>WhatsApp</span>
            <span className="contact-tooltip">
              Chat with Matt on WhatsApp
              <ArrowUpRight size={16} />
            </span>
          </a>
          <a
            className="contact-tool"
            href={`mailto:${directContact.email}`}
            onClick={() =>
              track("contact_click", {
                channel: "email",
                placement: "contact_tools",
              })
            }
          >
            <Mail size={24} aria-hidden="true" />
            <span>Email</span>
            <span className="contact-tooltip">{directContact.email}</span>
          </a>
          <button
            className="contact-tool"
            type="button"
            aria-haspopup="dialog"
            onClick={() =>
              window.dispatchEvent(new Event("longchi:open-wechat"))
            }
          >
            <WeChatIcon />
            <span>WeChat</span>
            <span className="contact-tooltip">Scan Matt’s WeChat QR code</span>
          </button>
          <a
            href="/contact/"
            className="contact-tool contact-enquiry"
            onClick={() =>
              track("contact_click", {
                channel: "enquiry",
                placement: "contact_tools",
              })
            }
          >
            <Send size={22} aria-hidden="true" />
            <span>Enquire</span>
          </a>
        </div>
        <SocialLinks className="contact-rail-socials" />
        <button
          className={`contact-tool contact-top ${scrolled ? "is-visible" : ""}`}
          type="button"
          aria-label="Back to top"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            });
          }}
          tabIndex={scrolled ? 0 : -1}
        >
          <ArrowUp size={21} aria-hidden="true" />
          <span>Top</span>
        </button>
      </aside>
      <dialog
        className="contact-dialog"
        ref={dialog}
        aria-labelledby="wechat-contact-title"
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not(:disabled),[tabindex="0"]')).filter(el => el.getClientRects().length);
          const first = controls[0], last = controls.at(-1);
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="contact-dialog-inner">
          <div className="contact-dialog-head">
            <div>
              <p>Connect with LONGCHI</p>
              <h2 id="wechat-contact-title">Let’s talk on WeChat.</h2>
            </div>
            <button
              type="button"
              className="contact-dialog-close"
              aria-label="Close WeChat contact"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              <X size={23} />
            </button>
          </div>
          <div className="contact-qr-layout">
            <img
              className="contact-qr"
              src={directContact.wechatQr}
              alt="Matt Chen’s original WeChat contact QR code"
              width="644"
              height="644"
            />
            <div className="contact-person">
              <span className="contact-person-monogram" aria-hidden="true">
                M
              </span>
              <h3>{directContact.name}</h3>
              <p>{directContact.role}</p>
              <p>
                Scan with WeChat to add Matt. On your phone, save the QR image
                and open it from WeChat’s scanner.
              </p>
              <a
                href={directContact.wechatQr}
                download="LONGCHI-Matt-WeChat.jpg"
                className="button"
              >
                Save QR image
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="contact-dialog-alternatives">
            <div>
              <p>Prefer email?</p>
              <a href={`mailto:${directContact.email}`}>
                {directContact.email}
              </a>
            </div>
            <button
              type="button"
              aria-label={copied ? "Email copied" : "Copy email address"}
              onClick={copyEmail}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
