'use client';
import { useRouter } from 'next/navigation';

interface LockedSectionProps {
  title: string;
  description: string;
  requiredPlan: 'basic' | 'premium';
  price: string;
}

export const LockedSection = ({ title, description, requiredPlan, price }: LockedSectionProps) => {
  const router = useRouter();

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 16,
      padding: 32,
      textAlign: 'center',
      background: '#fafafa',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{fontSize: 28, marginBottom: 8}}>🔒</div>
      <div style={{fontWeight: 600, fontSize: 15}}>{title}</div>
      <div style={{
        fontSize: 13, color: '#6b7280', 
        margin: '6px auto', maxWidth: 250, lineHeight: 1.5
      }}>
        {description}
      </div>
      <div style={{
        display: 'inline-block',
        fontSize: 12, fontWeight: 500,
        padding: '4px 12px',
        borderRadius: 20,
        background: requiredPlan === 'premium' ? '#EEEDFE' : '#E6F1FB',
        color: requiredPlan === 'premium' ? '#534AB7' : '#185FA5',
        margin: '12px 0'
      }}>
        {requiredPlan === 'premium' ? 'Premium' : 'Basic'} — {price}/month
      </div>
      <button
        onClick={() => router.push('/subscription')}
        style={{
          display: 'block', width: '100%', maxWidth: 200,
          background: '#1a1a1a', color: '#fff',
          border: 'none', borderRadius: 10,
          padding: '10px 0', marginTop: 10,
          fontWeight: 500, cursor: 'pointer',
          fontSize: 13
        }}
      >
        Upgrade to {requiredPlan === 'premium' ? 'Premium' : 'Basic'}
      </button>
    </div>
  );
};
