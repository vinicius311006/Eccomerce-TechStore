let textoPesquisa = ""
let categoriaAtual = "all"
let carrinho = []

const produtos = [
    { id: 1, nome: "iPhone 15 Pro", categoria: "smartphones", preco: 7999, imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", descricao: "O chip mais potente com acabamento em titânio." },
    { id: 2, nome: "MacBook Air M2", categoria: "laptops", preco: 8999, imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", descricao: "Fino, leve e absurdamente rápido." },
    { id: 3, nome: "AirPods Pro", categoria: "headphones", preco: 1899, imagem: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400", descricao: "Cancelamento de ruído de outro nível." },
    { id: 4, nome: "Samsung Galaxy S24", categoria: "smartphones", preco: 5499, imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", descricao: "A revolução da IA no seu bolso." },
    { id: 5, nome: "Apple Watch Series 9", categoria: "smartwatch", preco: 3299, imagem: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400", descricao: "Seu parceiro de saúde mais avançado." }
];

AOS.init({ duration: 800, once: true });

function mostrarProdutos() {
    let html = ""
    const filtrados = produtos.filter(p => {
        const cat = categoriaAtual === "all" || p.categoria === categoriaAtual
        const txt = p.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
        return cat && txt
    })

    filtrados.forEach((p, i) => {
        html += `
            <div class="product-card" data-aos="fade-up" data-aos-delay="${i * 50}">
                <img src="${p.imagem}" class="product-img">
                <div class="product-info">
                    <h3 class="product-name">${p.nome}</h3>
                    <p class="product-price">R$ ${p.preco.toLocaleString('pt-br')}</p>
                    <button class="product-button" onclick="abrirModal(${p.id})">Ver Detalhes</button>
                </div>
            </div>
        `
    })
    document.querySelector(".products-container").innerHTML = html
}

function toggleCart() { document.getElementById("cart-sidebar").classList.toggle("active"); }

function adicionarAoCarrinho(id) {
    const p = produtos.find(item => item.id === id)
    carrinho.push(p)
    atualizarCarrinho()
    fecharModal()
    if (!document.getElementById("cart-sidebar").classList.contains("active")) toggleCart()
}

function atualizarCarrinho() {
    const list = document.getElementById("cart-items")
    let total = 0
    list.innerHTML = carrinho.map((p, i) => {
        total += p.preco
        return `
            <div class="cart-item">
                <img src="${p.imagem}">
                <div>
                    <h4>${p.nome}</h4>
                    <p>R$ ${p.preco.toLocaleString('pt-br')}</p>
                    <small style="color:red; cursor:pointer" onclick="removerItem(${i})">Remover</small>
                </div>
            </div>
        `
    }).join("")
    document.getElementById("cart-count").innerText = carrinho.length
    document.getElementById("cart-total").innerText = `R$ ${total.toLocaleString('pt-br')}`
}

function removerItem(i) {
    carrinho.splice(i, 1)
    atualizarCarrinho()
}

function abrirModal(id) {
    const p = produtos.find(item => item.id === id)
    document.getElementById("modal-img").src = p.imagem
    document.getElementById("modal-name").innerText = p.nome
    document.getElementById("modal-desc").innerText = p.descricao
    document.getElementById("modal-price").innerText = `R$ ${p.preco.toLocaleString('pt-br')}`
    document.getElementById("btn-add-cart").onclick = () => adicionarAoCarrinho(p.id)
    document.getElementById("product-modal").style.display = "block"
}

function fecharModal() { document.getElementById("product-modal").style.display = "none"; }

document.querySelector(".search-input").addEventListener("input", (e) => {
    textoPesquisa = e.target.value
    mostrarProdutos()
})

document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        categoriaAtual = btn.dataset.category
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"))
        btn.classList.add("active")
        mostrarProdutos()
    })
})

window.onload = mostrarProdutos