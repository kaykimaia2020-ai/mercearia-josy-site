import { useState } from 'react';

export default function Home() {
  const [produtos] = useState([
    { nome: "Arroz 5kg", marca: "Tio João", preco: 24.90, estoque: 10, imagem: "https://unsplash.com" },
    { nome: "Leite Integral 1L", marca: "Itambé", preco: 5.50, estoque: 15, imagem: "https://unsplash.com" },
    { nome: "Café Tradicional", marca: "Melitta", preco: 18.20, estoque: 5, imagem: "https://unsplash.com" }
  ]);

  const [carrinho, setCarrinho] = useState([]);
  const [pagina, setPagina] = useState("loja");
  const [bloco, setBloco] = useState("");
  const [apto, setApto] = useState("");
  const [pagamento, setPagamento] = useState("Pix");
  const [recibo, setRecibo] = useState(null);

  const adicionarAoCarrinho = (prod) => {
    const qtd = carrinho.filter(item => item.nome === prod.nome).length;
    if (qtd < prod.estoque) setCarrinho([...carrinho, prod]);
    else alert("Estoque esgotado!");
  };

  const finalizarPedido = () => {
    if (!bloco || !apto) return alert("Preencha Bloco e Apartamento!");
    const numPedido = Math.floor(1000 + Math.random() * 9000);
    const total = carrinho.reduce((acc, cur) => acc + cur.preco, 0).toFixed(2);
    setRecibo({ numero: numPedido, bloco, apto, total, pagamento });
    setCarrinho([]);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', gap: '20px' }}>
      
      {/* MENU */}
      <div style={{ width: '220px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        <h3 style={{ color: '#16a34a', marginTop: 0 }}>🏪 Mercearia</h3>
        <button onClick={() => { setPagina("loja"); setRecibo(null); }} style={{ width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🛒 Compras</button>
        <button onClick={() => setPagina("horarios")} style={{ width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🕒 Horários</button>
      </div>

      {/* PAINEL PRINCIPAL */}
      <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        
        {/* VITRINE */}
        {pagina === "loja" && !recibo && (
          <div>
            <h1 style={{ color: '#16a34a', marginTop: 0, textAlign: 'center' }}>🏪 MERCEARIA JOSY</h1>
            <p style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}>🚨 Apenas retirada no local!</p>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <div style={{ flex: 2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                {produtos.map((p, i) => (
                  <div key={i} style={{ border: '1px solid #e5e7eb', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }}/>
                    <h4 style={{ margin: '8px 0 2px 0' }}>{p.nome}</h4>
                    <p style={{ color: '#16a34a', fontWeight: 'bold', margin: '0 0 8px 0' }}>R$ {p.preco.toFixed(2)}</p>
                    <button onClick={() => adicionarAoCarrinho(p)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Adicionar</button>
                  </div>
                ))}
              </div>

              {/* CARRINHO */}
              <div style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
                <h3>🛒 Seu Carrinho</h3>
                {carrinho.length === 0 ? <p>Vazio</p> : (
                  <div>
                    {carrinho.map((c, i) => <div key={i} style={{ padding: '2px 0' }}>• {c.nome}</div>)}
                    <h4>Total: R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h4>
                    <input placeholder="Bloco" value={bloco} onChange={e => setBloco(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0', boxSizing: 'border-box' }}/>
                    <input placeholder="Apto" value={apto} onChange={e => setApto(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0', boxSizing: 'border-box' }}/>
                    <select value={pagamento} onChange={e => setPagamento(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0' }}>
                      <option>Pix</option><option>Dinheiro</option>
                    </select>
                    <button onClick={finalizarPedido} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '5px', fontWeight: 'bold' }}>Finalizar</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RECIBO */}
        {pagina === "loja" && recibo && (
          <div style={{ border: '2px dashed #16a34a', padding: '20px', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
            <h2 style={{ color: '#16a34a', marginTop: 0 }}>🎉 Pedido Confirmado!</h2>
            <p><b>Número:</b> #{recibo.numero}</p>
            <p><b>Retirada:</b> Bloco {recibo.bloco} - Apto {recibo.apto}</p>
            <p><b>Pagamento:</b> {recibo.pagamento}</p>
            <h3>Total: R$ {recibo.total}</h3>
            <button onClick={() => setRecibo(null)} style={{ padding: '10px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Nova Compra</button>
          </div>
        )}

        {/* HORARIOS */}
        {pagina === "horarios" && (
          <div>
            <h2>🕒 Horários de Retirada</h2>
            <p><b>Terça a Sábado:</b> 08:00 às 10:00</p>
            <p><b>Domingo:</b> 09:00 às 10:00</p>
            <p style={{ color: '#dc2626' }}><b>Segunda-feira:</b> Fechado</p>
          </div>
        )}

      </div>
    </div>
  );
}
