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

  const verificarSenha = (p) => {
    if (senha === "josy 123") {
      setAutenticado(true);
      setPagina(p);
    } else { alert("Senha incorreta!"); }
  };

  const adicionarAoCarrinho = (prod) => {
    const qtdNoCarrinho = carrinho.filter(item => item.nome === prod.nome).length;
    if (qtdNoCarrinho < prod.estoque) { setCarrinho([...carrinho, prod]); } 
    else { alert("Limite de estoque atingido!"); }
  };

  const finalizarPedido = () => {
    if (!bloco || !apto) return alert("Preencha Bloco e Apartamento!");
    const novosProdutos = produtos.map(p => {
      const comprados = carrinho.filter(c => c.nome === p.nome).length;
      return { ...p, estoque: p.estoque - comprados };
    });
    setProdutos(novosProdutos);
    const numPedido = Math.floor(1000 + Math.random() * 9000);
    const total = carrinho.reduce((acc, cur) => acc + cur.preco, 0).toFixed(2);
    const novoPedido = { numero: numPedido, bloco, apto, total, pagamento };
    setPedidos([novoPedido, ...pedidos]);
    setRecibo(novoPedido);
    setCarrinho([]);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9fafb', color: '#1f2937', minHeight: '100vh', display: 'flex', gap: '20px' }}>
      <div style={{ width: '260px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        <h3 style={{ color: '#16a34a', marginTop: 0 }}>🏪 Navegação</h3>
        <button onClick={() => { setPagina("loja"); setAutenticado(false); setSenha(""); setRecibo(null); }} style={{ width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🛒 Ir às Compras</button>
        <button onClick={() => { setPagina("horarios"); setAutenticado(false); setSenha(""); }} style={{ width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px' }}>🕒 Horários</button>
        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #e5e7eb' }}/>
        <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>PAINÉL DA JOSY:</p>
        <button onClick={() => { setPagina("login-cadastrar"); setAutenticado(false); setSenha(""); }} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px' }}>➕ Cadastrar Produtos</button>
        <button onClick={() => { setPagina("login-estoque"); setAutenticado(false); setSenha(""); }} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px' }}>📦 Estoque e Balanço</button>
        <button onClick={() => { setPagina("login-excluir"); setAutenticado(false); setSenha(""); }} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px' }}>❌ Excluir Produtos</button>
        <button onClick={() => { setPagina("login-alterar"); setAutenticado(false); setSenha(""); }} style={{ width: '100%', padding: '8px', margin: '4px 0', cursor: 'pointer', borderRadius: '4px' }}>📝 Alterar Horários</button>
      </div>

      <div style={{ flex: 1, background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        {pagina === "loja" && (
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
                      <img src={p.imagem} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }}/>
                      <h4 style={{ margin: '8px 0 4px 0' }}>{p.nome}</h4>
                      <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#6b7280', margin: '0 0 8px 0' }}>Marca: {p.marca}</p>
                      <p style={{ color: '#16a34a', fontWeight: 'bold', margin: '0 0 8px 0' }}>R$ {p.preco.toFixed(2)}</p>
                      {p.estoque > 0 ? (
                        <div>
                          <p style={{ fontSize: '12px', color: '#16a34a', margin: '0 0 6px 0' }}>Estoque: <b>{p.estoque}</b> ud.</p>
                          <button onClick={() => adicionarAoCarrinho(p)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Adicionar</button>
                        </div>
                      ) : ( <p style={{ color: '#dc2626', fontWeight: 'bold', margin: 0 }}>🚫 ESGOTADO</p> )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
                <h3>🛒 Seu Carrinho</h3>
                {carrinho.length === 0 ? <p style={{ color: '#6b7280' }}>Carrinho vazio.</p> : (
                  <div>
                    {carrinho.map((c, i) => <div key={i} style={{ padding: '4px 0' }}>• {c.nome} - <b>R$ {c.preco.toFixed(2)}</b></div>)}
                    <h4 style={{ margin: '15px 0 10px 0' }}>Total: R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h4>
                    <button onClick={() => setCarrinho([])} style={{ cursor: 'pointer', padding: '4px 8px' }}>🗑️ Limpar</button>
                    <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }}/>
                    <input placeholder="Bloco" value={bloco} onChange={e => setBloco(e.target.value)} style={{ width: '100%', padding: '8px', margin: '4px 0', boxSizing: 'border-box' }}/>
                    <input placeholder="Apartamento" value={apto} onChange={e => setApto(e.target.value)} style={{ width: '100%', padding: '8px', margin: '4px 0', boxSizing: 'border-box' }}/>
                    <select value={pagamento} onChange={e => setPagamento(e.target.value)} style={{ width: '100%', padding: '8px', margin: '4px 0' }}>
                      <option>Pix</option><option>Débito</option><option>Crédito</option><option>Espécie</option>
                    </select>
                    <button onClick={finalizarPedido} style={{ width: '100%', padding: '12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>🏁 Confirmar e Reservar</button>
                  </div>
                )}
                {recibo && (
                  <div style={{ background: '#f0fdf4', padding: '15px', border: '1px solid #bbf7d0', borderRadius: '6px', marginTop: '15px' }}>
                    <h4 style={{ color: '#16a34a', margin: 0 }}>🎉 PEDIDO RESERVADO!</h4>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}><b>Número:</b> #{recibo.numero}<br/><b>Identificação:</b> Bloco {recibo.bloco} - Apto {recibo.apto}<br/><b>Total:</b> R$ {recibo.total}<br/><b>Pagar em:</b> {recibo.pagamento}</p>
                    <p style={{ fontSize: '12px', color: '#15803d', margin: 0 }}>Retire e pague no balcão da mercearia.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {pagina === "horarios" && (
          <div>
            <h2>🕒 Horários de Funcionamento</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <tbody>
                {Object.entries(horarios).map(([d, h]) => (
                  <tr key={d} style={{ borderBottom: '1px solid #e5e7eb' }}><td style={{ padding: '12px' }}><b>{d}</b></td><td style={{ padding: '12px' }}>{h}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagina.startsWith("login-") && (
          <div style={{ maxWidth: '350px', margin: '40px auto', textAlign: 'center' }}>

