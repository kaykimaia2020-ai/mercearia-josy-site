import { useState } from 'react';

export default function Home() {
  const [produtos, setProdutos] = useState([
    { nome: "Arroz 5kg", marca: "Tio João", preco: 24.90, estoque: 10, imagem: "https://unsplash.com" },
    { nome: "Leite Integral 1L", marca: "Itambé", preco: 5.50, estoque: 15, imagem: "https://unsplash.com" },
    { nome: "Café Tradicional 500g", marca: "Melitta", preco: 18.20, estoque: 8, imagem: "https://unsplash.com" },
    { nome: "Feijão Carioca 1kg", marca: "Kicaldo", preco: 8.90, estoque: 12, imagem: "https://unsplash.com" }
  ]);

  const [carrinho, setCarrinho] = useState([]);
  const [pagina, setPagina] = useState("loja");
  const [pesquisa, setPesquisa] = useState("");
  const [bloco, setBloco] = useState("");
  const [apto, setApto] = useState("");
  const [pagamento, setPagamento] = useState("Pix");
  const [recibo, setRecibo] = useState(null);

  const addCarrinho = (p) => {
    if (carrinho.filter(i => i.nome === p.nome).length < p.estoque) {
      setCarrinho([...carrinho, p]);
    } else {
      alert("Limite de estoque atingido!");
    }
  };

  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      padding: '20px', 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      gap: '20px',
      justifyContent: 'center'
    }}>
      
      {/* MENU LATERAL */}
      <div style={{ width: '240px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        <h3 style={{ color: '#16a34a', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>🏪 Menu</h3>
        <button onClick={() => { setPagina("loja"); setRecibo(null); }} style={{ width: '100%', padding: '12px', margin: '6px 0', cursor: 'pointer', background: '#f4fbf7', border: '1px solid #c8e6c9', borderRadius: '8px', color: '#1b5e20', fontWeight: 'bold' }}>🛒 Compras</button>
        <button onClick={() => setPagina("horarios")} style={{ width: '100%', padding: '12px', margin: '6px 0', cursor: 'pointer', background: '#f4fbf7', border: '1px solid #c8e6c9', borderRadius: '8px', color: '#1b5e20', fontWeight: 'bold' }}>🕒 Horários</button>
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e5e7eb' }}/>
        <p style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', letterSpacing: '1px' }}>PAINEL ADMINISTRATIVO:</p>
        <a href="/adm" style={{ display: 'block', textDecoration: 'none', textAlign: 'center', padding: '10px', borderRadius: '8px', background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>⚙️ Gerenciar Loja</a>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ flex: 1, maxWidth: '900px', background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        {pagina === "loja" && !recibo && (
          <div>
            <h1 style={{ textAlign: 'center', color: '#16a34a', marginTop: 0, marginBottom: '5px', letterSpacing: '1px' }}>🏪 MERCEARIA JOSY</h1>
            <p style={{ textAlign: 'center', color: '#666', marginTop: 0, fontSize: '14px' }}>Os melhores produtos pertinho de você</p>
            
            <div style={{ background: '#fff5f5', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ffcdd2', fontSize: '14px' }}>
              🚨 AVISO IMPORTANTE: Não realizamos entregas! Retire no local.
            </div>

            {/* BARRA DE PESQUISA */}
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="text" 
                placeholder="🔍 Digite aqui para buscar um produto..." 
                value={pesquisa}
                onChange={e => setPesquisa(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cccccc', fontSize: '16px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '25px' }}>
              {/* CARDÁPIO VERTICAL DE PRODUTOS */}
              <div style={{ flex: 1.8, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>📋 Cardápio de Produtos</h3>
                {produtosFiltrados.length === 0 ? <p style={{ color: '#888' }}>Nenhum produto encontrado.</p> : (
                  produtosFiltrados.map((p, i) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      border: '1px solid #e0e0e0', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      background: '#fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                      <img src={p.imagem} alt={p.nome} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', marginRight: '15px' }}/>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', color: '#333', fontSize: '16px' }}>{p.nome}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#777', fontStyle: 'italic' }}>Marca: {p.marca}</p>
                      </div>
                      <div style={{ textAlign: 'right', marginRight: '15px' }}>
                        <p style={{ color: '#16a34a', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '16px' }}>R$ {p.preco.toFixed(2)}</p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>Disponível: {p.estoque} un</p>
                      </div>
                      <button onClick={() => addCarrinho(p)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>Adicionar</button>
                    </div>
                  ))
                )}
              </div>

              {/* COLUNA DO CARRINHO */}
              <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: '20px', minWidth: '220px' }}>
                <h3 style={{ margin: '0 0 15px 0' }}>🛒 Seu Carrinho</h3>
                {carrinho.length === 0 ? <p style={{ color: '#888', fontSize: '14px' }}>Carrinho vazio</p> : (
                  <div>
                    <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '10px' }}>
                      {carrinho.map((c, i) => (
                        <div key={i} style={{ fontSize: '14px', padding: '6px 0', borderBottom: '1px dashed #eee', color: '#444' }}>
                          • {c.nome} - <b>R$ {c.preco.toFixed(2)}</b>
                        </div>
                      ))}
                    </div>
                    <h4 style={{ margin: '15px 0', color: '#333' }}>Total: <span style={{ color: '#16a34a' }}>R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</span></h4>
                    <input placeholder="Seu Bloco" value={bloco} onChange={e=>setBloco(e.target.value)} style={{ width: '100%', padding: '8px', margin: '4px 0', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}/>
                    <input placeholder="Seu Apartamento" value={apto} onChange={e=>setApto(e.target.value)} style={{ width: '100%', padding: '8px', margin: '4px 0', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}/>
                    
                    <label style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', display: 'block', marginTop: '6px' }}>Forma de Pagamento:</label>
                    <select value={pagamento} onChange={e=>setPagamento(e.target.value)} style={{ width: '100%', padding: '8px', margin: '4px 0', borderRadius: '6px', border: '1px solid #ccc' }}>
                      <option>Pix</option>
                      <option>Dinheiro (Espécie)</option>
                      <option>Cartão de Crédito</option>
                      <option>Cartão de Débito</option>
                    </select>
                    
                    <button onClick={() => setRecibo({ numero: Math.floor(1000 + Math.random()*9000), bloco, apto, pagamento, total: carrinho.reduce((a,b)=>a+b.preco,0).toFixed(2) })} style={{ width: '100%', padding: '12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '12px', fontWeight: 'bold', fontSize: '15px' }}>Finalizar Pedido</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TELA DE RECIBO */}
        {pagina === "loja" && recibo && (
          <div style={{ border: '2px dashed #16a34a', padding: '25px', borderRadius: '12px', backgroundColor: '#f0fdf4', maxWidth: '500px', margin: '20px auto' }}>
            <h2 style={{ color: '#16a34a', marginTop: 0, textAlign: 'center' }}>🎉 Pedido Feito com Sucesso!</h2>
            <p style={{ textAlign: 'center', color: '#555', fontSize: '14px' }}>Apresente os dados abaixo ao retirar suas compras.</p>
            <hr style={{ border: 'none', borderTop: '1px dashed #16a34a', margin: '15px 0' }}/>
            <p><b>Número do Cupom:</b> #{recibo.numero}</p>
            <p><b>Endereço de Entrega:</b> Bloco {recibo.bloco || "Não informado"} - Apto: {recibo.apto || "Não informado"}</p>
            <p><b>Forma Escolhida:</b> {recibo.pagamento}</p>
            <h3 style={{ marginTop: '20px' }}>Valor total a Pagar: <span style={{ color: '#16a34a' }}>R$ {recibo.total}</span></h3>
