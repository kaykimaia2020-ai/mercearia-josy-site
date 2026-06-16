import { useState } from 'react';

export default function Home() {
  const [produtos, setProdutos] = useState([
    { nome: "Arroz 5kg", marca: "Tio João", preco: 24.90, estoque: 10, imagem: "https://unsplash.com" },
    { nome: "Leite Integral 1L", marca: "Itambé", preco: 5.50, estoque: 15, imagem: "https://unsplash.com" },
    { nome: "Café Tradicional", marca: "Melitta", preco: 18.20, estoque: 5, imagem: "https://unsplash.com" }
  ]);

  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pagina, setPagina] = useState("loja");
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  
  const [novoNome, setNovoNome] = useState("");
  const [novaMarca, setNovaMarca] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novoEstoque, setNovoEstoque] = useState("");
  const [novoLink, setNovoLink] = useState("");
  
  const [bloco, setBloco] = useState("");
  const [apto, setApto] = useState("");
  const [pagamento, setPagamento] = useState("Pix");
  const [recibo, setRecibo] = useState(null);
  
  const [horarios, setHorarios] = useState({
    "Segunda-feira": "Fechado", "Terça-feira": "08:00 às 10:00", "Quarta-feira": "08:00 às 10:00",
    "Quinta-feira": "08:00 às 10:00", "Sexta-feira": "08:00 às 10:00", "Sábado": "08:00 às 10:00", "Domingo": "09:00 às 10:00"
  });

  const verificarSenha = (proximaPagina) => {
    if (senha === "josy 123") {
      setAutenticado(true);
      setPagina(proximaPagina);
    } else { 
      alert("Senha incorreta!"); 
    }
  };

  const acessarPainel = (proximaPagina) => {
    if (autenticado) {
      setPagina(proximaPagina);
    } else {
      setPagina(`login-${proximaPagina}`);
    }
  };

  const adicionarAoCarrinho = (prod) => {
    const qtdNoCarrinho = carrinho.filter(item => item.nome === prod.nome).length;
    if (qtdNoCarrinho < prod.estoque) { 
      setCarrinho([...carrinho, prod]); 
    } else { 
      alert("Limite de estoque atingido!"); 
    }
  };

  const finalizarPedido = () => {
    if (!bloco || !apto) return alert("Preencha Bloco e Apartamento!");
    if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

    const novosProdutos = produtos.map(p => {
      const comprados = carrinho.filter(c => c.nome === p.nome).length;
      return { ...p, estoque: p.estoque - comprados };
    });

    setProdutos(novosProdutos);
    const numPedido = Math.floor(1000 + Math.random() * 9000);
    const total = carrinho.reduce((acc, cur) => acc + cur.preco, 0).toFixed(2);
    
    const itensAgrupados = carrinho.reduce((acc, item) => {
      acc[item.nome] = (acc[item.nome] || 0) + 1;
      return acc;
    }, {});

    const novoPedido = { 
      numero: numPedido, 
      bloco, 
      apto, 
      total, 
      pagamento,
      itens: itensAgrupados 
    };

    setPedidos([novoPedido, ...pedidos]);
    setRecibo(novoPedido);
    setCarrinho([]);
  };

  const cadastrarProduto = (e) => {
    e.preventDefault();
    if (!novoNome || !novoPreco || !novoEstoque) return alert("Preencha os campos obrigatórios!");
    
    const novoProd = {
      nome: novoNome,
      marca: novaMarca || "Sem marca",
      preco: parseFloat(novoPreco),
      estoque: parseInt(novoEstoque),
      imagem: novoLink || "https://unsplash.com"
    };

    setProdutos([...produtos, novoProd]);
    alert("Produto cadastrado com sucesso!");
    setNovoNome(""); setNovaMarca(""); setNovoPreco(""); setNovoEstoque(""); setNovoLink("");
  };

  const excluirProduto = (nome) => {
    if (confirm(`Deseja realmente excluir o produto ${nome}?`)) {
      setProdutos(produtos.filter(p => p.nome !== nome));
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9fafb', color: '#1f2937', minHeight: '100vh', display: 'flex', gap: '20px' }}>
      
      {/* MENU LATERAL */}
      <div style={{ width: '260px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        <h3 style={{ color: '#16a34a', marginTop: 0 }}>🏪 Navegação</h3>
        <button onClick={() => { setPagina("loja"); setRecibo(null); }} style={{ width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🛒 Ir às Compras</button>
        <button onClick={() => { setPagina("horarios"); }} style={{ width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🕒 Horários</button>
        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #e5e7eb' }}/>
        <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>PAINEL DA JOSY:</p>
        <button onClick={() => acessarPainel("cadastrar")} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}>➕ Cadastrar Produtos</button>
        <button onClick={() => acessarPainel("estoque")} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}>📦 Estoque e Balanço</button>
        <button onClick={() => acessarPainel("excluir")} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>❌ Excluir Produtos</button>
        <button onClick={() => acessarPainel("alterar")} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}>📝 Alterar Horários</button>
        {autenticado && (
          <button onClick={() => { setAutenticado(false); setSenha(""); setPagina("loja"); }} style={{ width: '100%', padding: '6px', marginTop: '15px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🔒 Sair do Painel</button>
        )}
      </div>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        
        {/* FILTRO DE AUTENTICAÇÃO */}
        {pagina.startsWith("login-") && (
          <div style={{ maxWidth: '350px', margin: '40px auto', textAlign: 'center' }}>
            <h2>🔒 Área Restrita</h2>
            <p style={{ color: '#6b7280' }}>Digite a senha do painel:</p>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }} />
            <button onClick={() => verificarSenha(pagina.replace("login-", ""))} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Entrar</button>
          </div>
        )}

        {/* VITRINE DA LOJA */}
        {pagina === "loja" && !recibo && (
          <div>
            <h1 style={{ textAlign: 'center', color: '#16a34a', marginTop: 0 }}>🛒 MERCEARIA JOSY</h1>
            <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
              🚨 AVISO IMPORTANTE: Não realizamos entregas! Retire no local.
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 2 }}>
                <h3>Nossos Produtos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  {produtos.map((p, i) => (
                    <div key={i} style={{ border: '1px solid #e5e7eb', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                      <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }}/>
                      <h4 style={{ margin: '8px 0 4px 0' }}>{p.nome}</h4>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px 0' }}>{p.marca}</p>
                      <p style={{ color: '#16a34a', fontWeight: 'bold' }}>R$ {p.preco.toFixed(2)}</p>
                      {p.estoque > 0 ? (
                        <div>
                          <p style={{ fontSize: '12px' }}>Estoque: {p.estoque}</p>
                          <button onClick={() => adicionarAoCarrinho(p)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Adicionar</button>
                        </div>
                      ) : ( <p style={{ color: '#dc2626', fontWeight: 'bold' }}>🚫 ESGOTADO</p> )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
                <h3>🛒 Carrinho</h3>
                {carrinho.length === 0 ? <p>Vazio</p> : (
                  <div>
                    {carrinho.map((c, i) => <div key={i}>{c.nome} - R$ {c.preco.toFixed(2)}</div>)}
                    <h4>Total: R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h4>
                    <input placeholder="Bloco" value={bloco} onChange={e => setBloco(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0' }}/>
                    <input placeholder="Apto" value={apto} onChange={e => setApto(e.target.value)} style={{ width: '100%', padding: '6px', margin: '4px 0' }}/>
