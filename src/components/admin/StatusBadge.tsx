interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'large';
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-800' },
  contacted: { bg: 'bg-gray-100', text: 'text-gray-800' },
  qualified: { bg: 'bg-green-100', text: 'text-green-800' },
  quote_sent: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  converted: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  lost: { bg: 'bg-red-100', text: 'text-red-800' },
  archived: { bg: 'bg-gray-200', text: 'text-gray-700' },
};

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  quote_sent: 'Quote Sent',
  converted: 'Converted',
  lost: 'Lost',
  archived: 'Archived',
};

const defaultStyle = { bg: 'bg-blue-100', text: 'text-blue-800' };

export default function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const styles = statusStyles[status] || defaultStyle;
  const label = statusLabels[status] || status;
  const sizeClass = variant === 'large' ? 'px-4 py-2 text-base' : 'px-2 py-1 text-xs';

  return (
    <span className={`${sizeClass} rounded-full font-medium ${styles.bg} ${styles.text}`}>
      {label}
    </span>
  );
}
