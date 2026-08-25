import React, { useState, useMemo } from "react";

/**
 * Plantilla de factura editable.
 * - Cabecera con datos del emisor (Nombre, Dirección, NIF)
 * - Bloque de cliente
 * - Tabla de conceptos con cantidad/precio/total automático
 * - Subtotal, IVA e IRPF configurables, total a pagar
 * - Triángulo decorativo inferior derecho, como en la plantilla original
 */

const TEAL = "#1a8f89";
const TEAL_DARK = "#0f6b66";
const INK = "#16324a";
const LINE = "#c9d3d8";

let nextId = 4;

export default function InvoiceTemplate() {
  const [emisor, setEmisor] = useState({
    nombre: "Nombre del emisor",
    direccion: "Dirección completa",
    nif: "00000000X",
  });

  const [meta, setMeta] = useState({
    fecha: "2026-08-25",
    numero: "2026-001",
  });

  const [cliente, setCliente] = useState({
    nombre: "",
    domicilio: "",
    nif: "",
  });

  const [items, setItems] = useState([
    { id: 1, concepto: "", cantidad: 1, precio: 0 },
    { id: 2, concepto: "", cantidad: 1, precio: 0 },
    { id: 3, concepto: "", cantidad: 1, precio: 0 },
  ]);

  const [ivaPct, setIvaPct] = useState(21);
  const [irpfPct, setIrpfPct] = useState(15);
  const [pago, setPago] = useState("Transferencia bancaria — IBAN ES00 0000 0000 0000 0000");

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (Number(it.cantidad) || 0) * (Number(it.precio) || 0), 0),
    [items]
  );
  const iva = subtotal * (Number(ivaPct) / 100);
  const irpf = subtotal * (Number(irpfPct) / 100);
  const total = subtotal + iva - irpf;

  const eur = (n) =>
    n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const addRow = () => {
    setItems((prev) => [...prev, { id: nextId++, concepto: "", cantidad: 1, precio: 0 }]);
  };

  const removeRow = (id) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));
  };

  return (
    <div style={styles.page}>
      <style>{`
        .inv-input {
          border: none;
          background: transparent;
          font: inherit;
          color: inherit;
          outline: none;
          width: 100%;
          padding: 2px 4px;
          border-radius: 4px;
        }
        .inv-input:focus {
          background: #eef7f6;
          box-shadow: 0 0 0 1.5px ${TEAL};
        }
        .inv-input::placeholder { color: #9fb0b8; }
        .row-actions button {
          border: none;
          background: transparent;
          color: #b3453f;
          cursor: pointer;
          font-size: 13px;
          padding: 2px 6px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity .15s;
        }
        .item-row:hover .row-actions button { opacity: 1; }
        .add-row-btn {
          border: 1px dashed ${LINE};
          background: #fff;
          color: ${TEAL_DARK};
          font-weight: 600;
          font-size: 13px;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }
        .add-row-btn:hover { background: #eef7f6; border-color: ${TEAL}; }
        @media print {
          .no-print { display: none !important; }
          .inv-card { box-shadow: none !important; }
        }
        @media (max-width: 640px) {
          .inv-topgrid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .inv-totals { width: 100% !important; }
        }
      `}</style>

      <div className="inv-card" style={styles.card}>
        {/* Cabecera emisor */}
        <div className="inv-topgrid" style={styles.topGrid}>
          <div style={styles.emisorBlock}>
            <FieldRow label="Nombre">
              <input
                className="inv-input"
                value={emisor.nombre}
                onChange={(e) => setEmisor({ ...emisor, nombre: e.target.value })}
                placeholder="Tu nombre o razón social"
              />
            </FieldRow>
            <FieldRow label="Dirección">
              <input
                className="inv-input"
                value={emisor.direccion}
                onChange={(e) => setEmisor({ ...emisor, direccion: e.target.value })}
                placeholder="Calle, número, ciudad"
              />
            </FieldRow>
            <FieldRow label="NIF">
              <input
                className="inv-input"
                value={emisor.nif}
                onChange={(e) => setEmisor({ ...emisor, nif: e.target.value })}
                placeholder="NIF / CIF"
              />
            </FieldRow>
          </div>

          <div style={styles.metaBlock}>
            <FieldRow label="Fecha" align="right">
              <input
                className="inv-input"
                type="date"
                style={{ textAlign: "right" }}
                value={meta.fecha}
                onChange={(e) => setMeta({ ...meta, fecha: e.target.value })}
              />
            </FieldRow>
            <FieldRow label="Número" align="right">
              <input
                className="inv-input"
                style={{ textAlign: "right" }}
                value={meta.numero}
                onChange={(e) => setMeta({ ...meta, numero: e.target.value })}
                placeholder="0000"
              />
            </FieldRow>
          </div>
        </div>

        <h1 style={styles.title}>FACTURA</h1>

        {/* Bloque cliente */}
        <div style={styles.clienteBox}>
          <FieldRow label="Cliente">
            <input
              className="inv-input"
              value={cliente.nombre}
              onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
              placeholder="Nombre del cliente"
            />
          </FieldRow>
          <FieldRow label="Domicilio">
            <input
              className="inv-input"
              value={cliente.domicilio}
              onChange={(e) => setCliente({ ...cliente, domicilio: e.target.value })}
              placeholder="Dirección del cliente"
            />
          </FieldRow>
          <FieldRow label="DNI/NIF">
            <input
              className="inv-input"
              value={cliente.nif}
              onChange={(e) => setCliente({ ...cliente, nif: e.target.value })}
              placeholder="DNI o NIF del cliente"
            />
          </FieldRow>
        </div>

        {/* Tabla de conceptos */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, textAlign: "left" }}>CONCEPTO</th>
              <th style={{ ...styles.th, width: 90 }}>CANTIDAD</th>
              <th style={{ ...styles.th, width: 110 }}>PRECIO</th>
              <th style={{ ...styles.th, width: 120 }}>TOTAL</th>
              <th className="no-print" style={{ ...styles.th, width: 32, border: "none" }} />
            </tr>
          </thead>
          <tbody>
            {items.map((it) => {
              const rowTotal = (Number(it.cantidad) || 0) * (Number(it.precio) || 0);
              return (
                <tr key={it.id} className="item-row">
                  <td style={styles.td}>
                    <input
                      className="inv-input"
                      value={it.concepto}
                      onChange={(e) => updateItem(it.id, "concepto", e.target.value)}
                      placeholder="Descripción del producto o servicio"
                    />
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <input
                      className="inv-input"
                      type="number"
                      min="0"
                      style={{ textAlign: "center" }}
                      value={it.cantidad}
                      onChange={(e) => updateItem(it.id, "cantidad", e.target.value)}
                    />
                  </td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <input
                      className="inv-input"
                      type="number"
                      min="0"
                      step="0.01"
                      style={{ textAlign: "right" }}
                      value={it.precio}
                      onChange={(e) => updateItem(it.id, "precio", e.target.value)}
                    />
                  </td>
                  <td style={{ ...styles.td, textAlign: "right", fontWeight: 600 }}>
                    {eur(rowTotal)}
                  </td>
                  <td className="no-print row-actions" style={{ ...styles.td, border: "none", textAlign: "center" }}>
                    <button onClick={() => removeRow(it.id)} title="Eliminar fila">✕</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="add-row-btn no-print" onClick={addRow}>
          + Añadir concepto
        </button>

        {/* Pago + totales */}
        <div style={styles.bottomGrid}>
          <div style={styles.pagoBox}>
            <div style={styles.sectionLabel}>FORMA DE PAGO</div>
            <div style={{ marginTop: 8 }}>
              <input
                className="inv-input"
                value={pago}
                onChange={(e) => setPago(e.target.value)}
                placeholder="Transferencia, efectivo, etc."
              />
            </div>
          </div>

          <div className="inv-totals" style={styles.totalsBox}>
            <TotalRow label="SUBTOTAL" value={eur(subtotal)} />
            <TotalRow
              label={
                <span>
                  IVA (
                  <input
                    className="inv-input"
                    type="number"
                    style={{ width: 40, display: "inline", textAlign: "center", padding: 0 }}
                    value={ivaPct}
                    onChange={(e) => setIvaPct(e.target.value)}
                  />
                  %)
                </span>
              }
              value={eur(iva)}
            />
            <TotalRow
              label={
                <span>
                  IRPF (
                  <input
                    className="inv-input"
                    type="number"
                    style={{ width: 40, display: "inline", textAlign: "center", padding: 0 }}
                    value={irpfPct}
                    onChange={(e) => setIrpfPct(e.target.value)}
                  />
                  %)
                </span>
              }
              value={"-" + eur(irpf)}
            />
            <div style={styles.totalFinalRow}>
              <span>TOTAL A PAGAR</span>
              <span>{eur(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Triángulo decorativo */}
      <svg
        style={styles.triangle}
        viewBox="0 0 240 240"
        preserveAspectRatio="none"
      >
        <polygon points="240,0 240,240 0,240" fill={TEAL} />
      </svg>
      <div style={styles.brand}>tu marca</div>
    </div>
  );
}

function FieldRow({ label, align = "left", children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
      <span style={styles.fieldLabel}>{label}:</span>
      <div style={{ flex: align === "right" ? "0 1 140px" : "1 1 auto", minWidth: 90 }}>{children}</div>
    </div>
  );
}

function TotalRow({ label, value }) {
  return (
    <div style={styles.totalRow}>
      <span style={{ color: "#3c5a68" }}>{label}</span>
      <span style={{ fontWeight: 600, color: TEAL_DARK }}>{value}</span>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100%",
    background: "#eef2f3",
    padding: "32px 16px",
    fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
    color: INK,
    overflow: "hidden",
    boxSizing: "border-box",
  },
  card: {
    position: "relative",
    zIndex: 2,
    maxWidth: 780,
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: 10,
    padding: "36px 40px 44px",
    boxShadow: "0 10px 30px rgba(15,60,60,0.08)",
    fontSize: 14,
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 32,
    marginBottom: 18,
  },
  emisorBlock: { minWidth: 0 },
  metaBlock: { minWidth: 160 },
  fieldLabel: { fontWeight: 700, whiteSpace: "nowrap", fontSize: 13.5 },
  title: {
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: 1,
    color: INK,
    margin: "10px 0 22px",
  },
  clienteBox: {
    border: `1.5px solid ${LINE}`,
    borderRadius: 8,
    padding: "16px 18px",
    marginBottom: 24,
    background: "#fbfcfc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 4,
  },
  th: {
    border: `1.5px solid ${LINE}`,
    background: "#f3f7f7",
    color: TEAL_DARK,
    fontSize: 12.5,
    letterSpacing: 0.4,
    padding: "9px 10px",
    textAlign: "center",
  },
  td: {
    border: `1.5px solid ${LINE}`,
    padding: "7px 10px",
    fontSize: 13.5,
  },
  bottomGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
    marginTop: 28,
    flexWrap: "wrap",
  },
  pagoBox: {
    flex: "1 1 260px",
    border: `1.5px solid ${LINE}`,
    borderRadius: 8,
    padding: "14px 16px",
    minHeight: 90,
  },
  sectionLabel: {
    fontWeight: 700,
    fontSize: 13,
    color: TEAL_DARK,
  },
  totalsBox: {
    width: 260,
    border: `1.5px solid ${LINE}`,
    borderRadius: 8,
    padding: "14px 16px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    fontSize: 13.5,
  },
  totalFinalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTop: `1.5px solid ${LINE}`,
    fontWeight: 800,
    fontSize: 15,
    color: INK,
  },
  triangle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 200,
    height: 200,
    zIndex: 1,
  },
  brand: {
    position: "absolute",
    right: 18,
    bottom: 16,
    zIndex: 3,
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 0.3,
  },
};
