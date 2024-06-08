let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const bannerImage = document.querySelector('.banner img');
    bannerImage.style.transform = 'translateY(' + (scrolled * 0.5) + 'px) translateZ(-1px) scale(2)';
});

let currentPage = 1;
let itemsPerPage = 10;
let sortBy = 'newest';

async function fetchPosts() {
    const sortParam = sortBy === 'newest' ? '-published_at' : 'published_at';
    try {
        const response = await fetch(`http://localhost:3000/api/ideas?page[number]=${currentPage}&page[size]=${itemsPerPage}&sort=${sortParam}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function renderPosts() {
    const posts = await fetchPosts();
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-4 mb-4';
        postCard.innerHTML = `
            <div class="card post-card">
                <img class="card-img-top" src="${post.medium_image}" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title post-title">${post.title}</h5>
                    <p class="card-text"><small class="text-muted">${new Date(post.published_at).toLocaleDateString()}</small></p>
                </div>
            </div>
        `;
        postList.appendChild(postCard);
    });
}

document.getElementById('sort-by').addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderPosts();
});

document.getElementById('items-per-page').addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value, 10);
    renderPosts();
});

renderPosts();