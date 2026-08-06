interface MetricCardProps {
  label: string;
  value: number;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const variantStyles = {
  default: 'bg-blue-50 border-blue-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  error: 'bg-red-50 border-red-200',
};

const valueStyles = {
  default: 'text-blue-900',
  success: 'text-green-900',
  warning: 'text-yellow-900',
  error: 'text-red-900',
};

export default function MetricCard({
  label,
  value,
  description,
  variant = 'default',
}: MetricCardProps) {
  return (
    <div className={`rounded-lg border p-6 ${variantStyles[variant]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${valueStyles[variant]}`}>{value}</p>
      {description && <p className="text-xs text-gray-600 mt-2">{description}</p>}
    </div>
  );
}
