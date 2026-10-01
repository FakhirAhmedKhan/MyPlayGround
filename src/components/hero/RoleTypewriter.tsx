"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TYPE_MS = 80;
const DELETE_MS = 40;
const HOLD_MS = 2000;
const SWAP_MS = 50;

interface RoleTypewriterProps {
  prefix: string;
  roles: string[];
}

/**
 * "I can be <role>" typewriter.
 *
 * - Lives in its own component so each keystroke re-renders only this line, never the hero.
 * - Starts on the first role already typed (so server HTML, no-JS and reduced-motion users
 *   all see a complete sentence) and then cycles: hold → delete → type the next role.
 * - Every role is rendered once, invisible, in the same grid cell as the typed text, so the
 *   line is always as wide as the longest role and nothing shifts while typing.
 */
export default function RoleTypewriter({ prefix, roles }: RoleTypewriterProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  const animate = !reduced && roles.length > 1;

  useEffect(() => {
    if (!animate) return;
    const role = roles[index % roles.length];

    let delay: number;
    let step: () => void;
    if (!deleting && text.length < role.length) {
      delay = TYPE_MS;
      step = () => setText(role.slice(0, text.length + 1));
    } else if (!deleting) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (text.length > 0) {
      delay = DELETE_MS;
      step = () => setText(text.slice(0, -1));
    } else {
      delay = SWAP_MS;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      };
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [animate, roles, index, text, deleting]);

  const shown = animate ? text : (roles[index % roles.length] ?? "");

  return (
    <div className="hero-role">
      <p className="sr-only">
        {prefix} {roles.join(", ")}
      </p>
      <p className="hero-role__line" aria-hidden="true">
        <span className="hero-role__prefix">{prefix}</span>{" "}
        <span className="hero-role__slot">
          {roles.map((role) => (
            <span key={role} className="hero-role__ghost">
              {role}
            </span>
          ))}
          <span className="hero-role__typed">
            {shown}
            <span className="hero-role__caret type-cursor-blink" />
          </span>
        </span>
      </p>
    </div>
  );
}
