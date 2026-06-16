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
  const [senha, setSenha] = useState("");

  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novoEstoque, setNovoEstoque] = useState("");
  const [novoLink, setNovoLink] = useState("");

  const addCarrinho = (p) => {
    if (carrinho.filter(i => i.nome === p.nome).length < p.estoque) setCarrinho([...carrinho, p]);
    else alert("Limite atingido!");
  };

  const salvarProd = (e) => {
    e.preventDefault();
    setProdutos([...produtos, { nome: novoNome, marca: "Variados", preco: parseFloat(novoPreco), estoque: parseInt(novoEstoque), imagem: novoLink || "https://unsplash.com" }]);
    alert("Cadastrado com sucesso!"); setNovoNome(""); setNovoPreco(""); setNovoEstoque(""); setNovoLink("");
  };

  const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(pesquisa.toLowerCase()));

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)', minHeight: '100vh', display: 'flex', gap: '20px', justifyContent: 'center' }}>
      
      {/* MENU */}
      <div style={{ width: '230px', background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        <h3 style={{ color: '#16a34a', marginTop: 0 }}>🏪 Menu</h3>
        <button onClick={() => setPagina("loja")} style={{ width: '100%', padding: '12px', margin: '4px 0', cursor: 'pointer', background: '#f4fbf7', border: '1px solid #c8e6c9', borderRadius: '8px', color: '#1b5e20', fontWeight: 'bold' }}>🛒 Compras</button>
        <button onClick={() => setPagina("horarios")} style={{ width: '100%', padding: '12px', margin: '4px 0', cursor: 'pointer', background: '#f4fbf7', border: '1px solid #c8e6c9', borderRadius: '8px', color: '#1b5e20', fontWeight: 'bold' }}>🕒 Horários</button>
        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }}/>
        <button onClick={() => setPagina(pagina === "adm" ? "loja" : "login-adm")} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#2e7d32', fontWeight: 'bold', cursor: 'pointer' }}>⚙️ Admin</button>
      </div>

      {/* PAINEL PRINCIPAL */}
      <div style={{ flex: 1, maxWidth: '850px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        {/* LOGIN DO ADMIN */}
        {pagina === "login-adm" && (
          <div style={{ maxWidth: '300px', margin: '40px auto', textAlign: 'center' }}>
            <h2>🔒 Login do Painel</h2>
            <input type="password" placeholder="Senha da Josy" value={senha} onChange={e=>setSenha(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
            <button onClick={() => { if(senha === "josy 123") setPagina("adm"); else alert("Incorreta!"); }} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Entrar</button>
          </div>
        )}

        {/* LOJA VIRTUAL */}
        {pagina === "loja" && (
          <div>
            <h1 style={{ textAlign: 'center', color: '#16a34a', margin: '0 0 5px 0' }}>🏪 MERCEARIA JOSY</h1>
            <div style={{ background: '#fff5f5', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ffcdd2', fontSize: '13px' }}>🚨 AVISO IMPORTANTE: Não realizamos entregas! Retire no local.</div>
            <input type="text" placeholder="🔍 Buscar um produto..." value={pesquisa} onChange={e => setPesquisa(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1.8, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filtrados.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', padding: '10px', borderRadius: '8px', background: '#fff' }}>
                    <img src={p.imagem} alt={p.nome} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', marginRight: '12px' }}/>
                    <div style={{ flex: 1 }}><h4 style={{ margin: '0 0 2px 0' }}>{p.nome}</h4><p style={{ margin: 0, fontSize: '12px', color: '#777' }}>{p.marca}</p></div>
                    <div style={{ textAlign: 'right', marginRight: '12px' }}><p style={{ color: '#16a34a', fontWeight: 'bold', margin: 0 }}>R$ {p.preco.toFixed(2)}</p></div>
                    <button onClick={() => addCarrinho(p)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Adicionar</button>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: '15px' }}>
                <h3>🛒 Carrinho</h3>
                {carrinho.map((c, i) => <div key={i} style={{ fontSize: '13px', padding: '3px 0' }}>• {c.nome}</div>)}
                <h4>Total: R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h4>
                <input placeholder="Bloco" value={bloco} onChange={e=>setBloco(e.target.value)} style={{ width: '100%', padding: '6px', margin: '3px 0', borderRadius: '4px', border: '1px solid #ccc' }}/>
                <input placeholder="Apartamento" value={apto} onChange={e=>setApto(e.target.value)} style={{ width: '100%', padding: '6px', margin: '3px 0', borderRadius: '4px', border: '1px solid #ccc' }}/>
                <select value={pagamento} onChange={e=>setPagamento(e.target.value)} style={{ width: '100%', padding: '6px', margin: '3px 0', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option>Pix</option><option>Dinheiro (Espécie)</option><option>Cartão de Crédito</option><option>Cartão de Débito</option>
                </select>
                <button onClick={() => { if(!bloco || !apto) return alert("Preencha bloco e apartamento!"); alert("Pedido Finalizado! Retire na mercearia."); setCarrinho([]); setBloco(""); setApto(""); }} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}>Finalizar</button>
              </div>
            </div>
          </div>
        )}

        {/* TELA DE HORÁRIOS */}
        {pagina === "horarios" && (
          <div>
            <h2>🕒 Horários para Retirada</h2>
            <p><b>Terça a Sábado:</b> 08:00 às 10:00</p>
            <p><b>Domingo:</b> 09:00 às 10:00</p>
            <p style={{ color: '#dc2626' }}><b>Segunda-feira:</b> Fechado</p>
          </div>
        )}

        {/* TELA DE ADMINISTRAÇÃO INTEGRADA */}
        {pagina === "adm" && (
          <div>
            <h2>⚙️ Painel da Josy (Estoque e Vitrine)</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
              <form onSubmit={salvarProd} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4>➕ Adicionar Produto</h4>
                <input placeholder="Nome" value={novoNome} onChange={e=>setNovoNome(e.target.value)} required style={{ padding: '6px' }}/>
                <input type="number" step="0.01" placeholder="Preço (R$)" value={novoPreco} onChange={e=>setNovoPreco(e.target.value)} required style={{ padding: '6px' }}/>
                <input type="number" placeholder="Estoque Inicial" value={novoEstoque} onChange={e=>setNovoEstoque(e.target.value)} required style={{ padding: '6px' }}/>
                <input placeholder="Link da Imagem (URL)" value={novoLink} onChange={e=>setNovoLink(e.target.value)} style={{ padding: '6px' }}/>
                <button type="submit" style={{ padding: '8px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Salvar Produto</button>
              </form>
              <div style={{ flex: 1 }}>
                <h4>📦 Estoque & Exclusão</h4>
                {produtos.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                    <span>{p.nome} (<b>{p.estoque} un</b>)</span>
                    <button onClick={() => setProdutos(produtos.filter(prod => prod.nome !== p.nome))} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Excluir</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

