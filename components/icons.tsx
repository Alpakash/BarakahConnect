// Consistente lijn-icoonset ter vervanging van emoji, die niet aansluiten bij
// de rest van de (vector/serif) vormtaal van de site.

type IconProps = { className?: string };

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5L3.75 15a1.5 1.5 0 002.12 2.12l.63-.62M8.25 10.5l3-3 3 3M8.25 10.5l3.97 3.97a1.5 1.5 0 002.12 0l.16-.16a1.5 1.5 0 000-2.12M14.25 7.5l3 3 2.25-2.25a1.5 1.5 0 00-2.12-2.12L15.75 7.5M6.5 16.5l2 2a1.5 1.5 0 002.12 0l.16-.16a1.5 1.5 0 000-2.12" />
    </svg>
  );
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.87c.5.36.8.94.8 1.55V16h5.4v-.58c0-.61.3-1.19.8-1.55A6 6 0 0012 3z" />
    </svg>
  );
}

export function MoonStarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 3.75l.5 1.25 1.25.5-1.25.5-.5 1.25-.5-1.25-1.25-.5 1.25-.5z" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.8 5.4L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.6L12 3z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h.75a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.439l-3.13-.94a1.5 1.5 0 00-1.514.395l-.812.812a1.125 1.125 0 01-1.401.163 12.02 12.02 0 01-4.913-4.913 1.125 1.125 0 01.163-1.4l.812-.813a1.5 1.5 0 00.395-1.514l-.94-3.13a1.5 1.5 0 00-1.439-1.077H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6h15a.75.75 0 01.75.75V19.5a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V6.75A.75.75 0 014.5 6z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 1.5M20.25 12a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z" />
    </svg>
  );
}

// Vertaalt de emoji die al als data in Sanity staan (featuresSection.items[].emoji)
// naar het bijpassende icoon, zodat bestaande content automatisch meegaat zonder migratie.
const EMOJI_ICON_MAP: Record<string, (props: IconProps) => React.JSX.Element> = {
  '🤝': HandshakeIcon,
  '💡': LightbulbIcon,
  '🌙': MoonStarIcon,
};

export function ResolvedIcon({ emoji, className }: { emoji?: string; className?: string }) {
  const Icon = (emoji && EMOJI_ICON_MAP[emoji.trim()]) || SparkleIcon;
  return <Icon className={className} />;
}
