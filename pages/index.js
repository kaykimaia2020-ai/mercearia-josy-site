import { useState } from 'react';

export default function Home() {
  const [produtos] = useState([
    { nome: "Arroz 5kg", marca: "Tio João", preco: 24.90, estoque: 10, imagem: "https://unsplash.com" },
    { nome: "Leite Integral 1L", marca: "Itambé", preco: 5.50, estoque: 15, imagem: "https://unsplash.com" }
  ]);

  const [carrinho, setCarrinho] = useState([]);
  const [pagina, setPagina] = useState("loja");
  const [bloco, setBloco] = useState("");
  const [apto, setApto] = useState("");
  const [pagamento, setPagamento] = useState("Pix");
  const [recibo, setRecibo] = useState(null);

  const addCarrinho = (p) => {
    if (carrinho.filter(i => i.nome === p.nome).length < p.estoque) setCarrinho([...carrinho, p]);
    else alert("Limite de estoque atingido!");
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', gap: '20px' }}>
      <div style={{ width: '230px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        <h3 style={{ color: '#16a34a', marginTop: 0 }}>🏪 Navegação</h3>
        <button onClick={() => { setPagina("loja"); setRecibo(null); }} style={{ width: '100%', padding: '10px', margin: '4px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🛒 Compras</button>
        <button onClick={() => setPagina("horarios")} style={{ width: '100%', padding: '10px', margin: '4px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🕒 Horários</button>
        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #e5e7eb' }}/>
        <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>PAINEL DA JOSY:</p>
        <a href="/adm" style={{ display: 'block', textDecoration: 'none', textAlign: 'center', padding: '8px', borderRadius: '4px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontWeight: 'bold', fontSize: '14px' }}>⚙️ Gerenciar Loja</a>
      </div>

      <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        {pagina === "loja" && !recibo && (
          <div>
            <h1 style={{ textAlign: 'center', color: '#16a34a', marginTop: 0 }}>🏪 MERCEARIA JOSY</h1>
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>🚨 AVISO: Não realizamos entregas! Retire no local.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {produtos.map((p, i) => (
                  <div key={i} style={{ border: '1px solid #e5e7eb', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }}/>
                    <h4>{p.nome}</h4>
                    <p style={{ color: '#16a34a', fontWeight: 'bold' }}>R$ {p.preco.toFixed(2)}</p>
                    <button onClick={() => addCarrinho(p)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Adicionar</button>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
                <h3>🛒 Carrinho</h3>
                {carrinho.length === 0 ? <p>Vazio</p> : (
                  <div>
                    {carrinho.map((c, i) => <div key={i}>• {c.nome}</div>)}
                    <h4>Total: R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h4>
                    <input placeholder="Bloco" value={bloco} onChange={e=>setBloco(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0' }}/>
                    <input placeholder="Apto" value={apto} onChange={e=>setApto(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0' }}/>
                    <select value={pagamento} onChange={e=>setPagamento(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0' }}>
                      <option>Pix</option><option>Espécie</option><option>Crédito</option><option>Débito</option>
                    </select>
                    <button onClick={() => setRecibo({ numero: Math.floor(1000 + Math.random()*9000), bloco, apto, pagamento, total: carrinho.reduce((a,b)=>a+b.preco,0).toFixed(2) })} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '8px', fontWeight: 'bold' }}>Finalizar</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {pagina === "loja" && recibo && (
          <div style={{ border: '2px dashed #16a34a', padding: '20px', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
            <h2>🎉 Pedido Confirmado!</h2>
            <p><b>Número:</b> #{recibo.numero}</p>
            <p><b>Retirada no Bloco:</b> {recibo.bloco} - Apto: {recibo.apto}</p>
            <h3>Total: R$ {recibo.total}</h3>
            <button onClick={() => { setRecibo(null); setCarrinho([]); }} style={{ padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px' }}>Nova Compra</button>
          </div>
        )}

        {pagina === "horarios" && (
          <div>
            <h2>🕒 Horários</h2>
            <p><b>Terça a Sábado:</b> 08:00 às 10:00</p>
            <p><b>Domingo:</b> 09:00 às 10:00</p>
            <p style={{ color: '#dc2626' }}><b>Segunda-feira:</b> Fechado</p>
          </div>
        )}
      </div>
    </div>
  );
}
