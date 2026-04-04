export default function AvatarInitials({ firstName = '', lastName = '', color = '#8b5cf6', size = 40, style = {} }) {
  const initials = (() => {
    const f = (firstName || '').trim();
    const l = (lastName  || '').trim();
    if (!f && !l) return '?';
    if (!l) return f[0]?.toUpperCase() || '?';
    return ((f[0] || '') + (l[0] || '')).toUpperCase();
  })();

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 600,
      fontSize: size * 0.36,
      flexShrink: 0,
      letterSpacing: '-0.5px',
      ...style,
    }}>
      {initials}
    </div>
  );
}
