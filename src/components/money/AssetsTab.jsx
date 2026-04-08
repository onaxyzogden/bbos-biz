import { useState, useMemo } from 'react';
import { Plus, Package, X, Pencil, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';
import { CURRENCIES } from '../../data/money-categories';

const CATEGORIES = [
  'Real Estate', 'Vehicle', 'Equipment', 'Investment', 'Inventory', 'Intellectual Property', 'Other',
];

const CATEGORY_ICONS = {
  'Real Estate': '🏠', Vehicle: '🚗', Equipment: '⚙️', Investment: '📈',
  Inventory: '📦', 'Intellectual Property': '💡', Other: '📋',
};

function AssetPanel({ asset, onClose }) {
  const addAsset = useMoneyStore((s) => s.addAsset);
  const updateAsset = useMoneyStore((s) => s.updateAsset);
  const isEdit = !!asset;

  const [name, setName] = useState(asset?.name || '');
  const [category, setCategory] = useState(asset?.category || 'Other');
  const [purchaseDate, setPurchaseDate] = useState(asset?.purchaseDate || '');
  const [purchasePrice, setPurchasePrice] = useState(asset?.purchasePrice || '');
  const [currentValue, setCurrentValue] = useState(asset?.currentValue || '');
  const [currency, setCurrency] = useState(asset?.currency || 'CAD');
  const [notes, setNotes] = useState(asset?.notes || '');

  const handleSave = () => {
    if (!name) return;
    const data = { name, category, purchaseDate, purchasePrice, currentValue, currency, notes };
    if (isEdit) updateAsset(asset.id, data);
    else addAsset(data);
    onClose();
  };

  return (
    <div className="money-slidein-overlay" onClick={onClose}>
      <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
        <div className="money-slidein-header">
          <div>
            <h3>{isEdit ? 'Edit Asset' : 'Add Asset'}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', margin: 0 }}>
              Track physical and financial assets owned by the business.
            </p>
          </div>
          <button className="money-slidein-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="money-slidein-body">
          <div className="money-field">
            <label>Asset name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Office building, Company car" />
          </div>
          <div className="money-field-row">
            <div className="money-field" style={{ flex: 1 }}>
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="money-field" style={{ width: 120 }}>
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.id}</option>)}
              </select>
            </div>
          </div>
          <div className="money-field">
            <label>Purchase date</label>
            <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
          </div>
          <div className="money-field-row">
            <div className="money-field" style={{ flex: 1 }}>
              <label>Purchase price</label>
              <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0" />
            </div>
            <div className="money-field" style={{ flex: 1 }}>
              <label>Current value</label>
              <input type="number" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} placeholder="0" />
            </div>
          </div>
          <div className="money-field">
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional details..." rows={3}
              style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.85rem', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)' }} />
          </div>
        </div>
        <div className="money-slidein-footer">
          <button className="btn btn-primary" onClick={handleSave} disabled={!name} style={{ background: 'var(--mod-money)', width: '100%' }}>
            {isEdit ? 'Save changes' : 'Add asset'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssetsTab() {
  const assets = useMoneyStore((s) => s.assets);
  const updateAsset = useMoneyStore((s) => s.updateAsset);
  const [statusFilter, setStatusFilter] = useState('active');
  const [showPanel, setShowPanel] = useState(false);
  const [editAsset, setEditAsset] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return assets;
    return assets.filter((a) => a.status === statusFilter);
  }, [assets, statusFilter]);

  const totalValue = useMemo(() =>
    assets.filter((a) => a.status === 'active').reduce((s, a) => s + (Number(a.currentValue) || 0), 0),
  [assets]);

  const totalPurchase = useMemo(() =>
    assets.filter((a) => a.status === 'active').reduce((s, a) => s + (Number(a.purchasePrice) || 0), 0),
  [assets]);

  const mainCurrency = assets.length > 0 ? assets[0].currency : 'CAD';

  return (
    <div>
      <div className="money-filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>Status:</span>
          <div className="money-toggle-group">
            {['all', 'active', 'archived'].map((s) => (
              <button key={s} className={`money-toggle-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditAsset(null); setShowPanel(true); }} style={{ background: 'var(--mod-money)' }}>
          <Plus size={14} /> Add Asset
        </button>
      </div>

      {assets.filter((a) => a.status === 'active').length > 0 && (
        <div className="accounts-summary" style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div>
            Total asset value: <strong>{formatCurrency(totalValue, mainCurrency)}</strong>
          </div>
          <div>
            Total invested: <strong>{formatCurrency(totalPurchase, mainCurrency)}</strong>
          </div>
          {totalPurchase > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {totalValue >= totalPurchase
                ? <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                : <TrendingDown size={14} style={{ color: 'var(--danger)' }} />}
              <span style={{ color: totalValue >= totalPurchase ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>
                {totalValue >= totalPurchase ? '+' : ''}{formatCurrency(totalValue - totalPurchase, mainCurrency)} ({Math.round(((totalValue - totalPurchase) / totalPurchase) * 100)}%)
              </span>
            </div>
          )}
        </div>
      )}

      <div className="accounts-list">
        {filtered.length === 0 ? (
          <div className="money-empty-state">
            <Package size={40} style={{ color: 'var(--text3)', marginBottom: 'var(--space-3)' }} />
            <h4>No assets yet</h4>
            <p>Track your business assets — real estate, vehicles, equipment, investments, and more.</p>
            <button className="btn btn-primary" onClick={() => { setEditAsset(null); setShowPanel(true); }} style={{ background: 'var(--mod-money)', marginTop: 'var(--space-3)' }}>
              <Plus size={14} /> Add your first asset
            </button>
          </div>
        ) : (
          filtered.map((asset) => {
            const gain = (Number(asset.currentValue) || 0) - (Number(asset.purchasePrice) || 0);
            const gainPct = asset.purchasePrice ? Math.round((gain / asset.purchasePrice) * 100) : 0;
            return (
              <div key={asset.id} className="account-row">
                <div className="account-row-main" onClick={() => setExpandedId(expandedId === asset.id ? null : asset.id)}>
                  <div className="account-info">
                    <div className="account-icon" style={{ fontSize: '1.2rem' }}>
                      {CATEGORY_ICONS[asset.category] || '📋'}
                    </div>
                    <div>
                      <div className="account-name">{asset.name}</div>
                      <div className="account-number">{asset.category}</div>
                    </div>
                    <span className="account-currency-badge">{asset.currency}</span>
                  </div>
                  <div className="account-balance-area">
                    <span className="account-balance">{formatCurrency(asset.currentValue, asset.currency)}</span>
                    {asset.purchasePrice > 0 && (
                      <span style={{ fontSize: '0.75rem', color: gain >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>
                        {gain >= 0 ? '+' : ''}{gainPct}%
                      </span>
                    )}
                    <button className="row-action-btn" onClick={(e) => { e.stopPropagation(); setEditAsset(asset); setShowPanel(true); }} title="Edit">
                      <Pencil size={14} />
                    </button>
                    <ChevronDown size={16} className={`account-chevron ${expandedId === asset.id ? 'expanded' : ''}`} />
                  </div>
                </div>
                {expandedId === asset.id && (
                  <div className="account-expanded">
                    <div className="account-detail-grid">
                      {asset.purchaseDate && <div><span>Purchased:</span> {new Date(asset.purchaseDate).toLocaleDateString()}</div>}
                      <div><span>Purchase price:</span> {formatCurrency(asset.purchasePrice, asset.currency)}</div>
                      <div><span>Current value:</span> {formatCurrency(asset.currentValue, asset.currency)}</div>
                      <div><span>Gain/Loss:</span> <span style={{ color: gain >= 0 ? 'var(--success)' : 'var(--danger)' }}>{formatCurrency(gain, asset.currency)}</span></div>
                      {asset.notes && <div style={{ gridColumn: '1 / -1' }}><span>Notes:</span> {asset.notes}</div>}
                    </div>
                    <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }}
                        onClick={() => updateAsset(asset.id, { status: asset.status === 'active' ? 'archived' : 'active' })}>
                        {asset.status === 'active' ? 'Archive' : 'Activate'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {showPanel && <AssetPanel asset={editAsset} onClose={() => { setShowPanel(false); setEditAsset(null); }} />}
    </div>
  );
}
