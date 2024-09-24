document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postsContainer = document.getElementById('postsContainer');

    // Load posts from local storage
    loadPosts();

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const content = postContent.value;
        const imageFile = postImage.files[0];
        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
        const dateTime = new Date().toLocaleString();
        const post = {
            content: content,
            image: imageUrl,
            dateTime: dateTime,
            likes: 0
        };

        // Save post to local storage
        savePost(post);
        displayPost(post);

        // Clear the form
        postForm.reset();
    });

    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(displayPost);
    }

    function displayPost(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const content = document.createElement('p');
        content.textContent = post.content;

        const image = document.createElement('img');
        if (post.image) {
            image.src = post.image;
        }

        const dateTime = document.createElement('small');
        dateTime.textContent = post.dateTime;

        const likeButton = document.createElement('span');
        likeButton.textContent = ` 👍 ${post.likes}`;
        likeButton.classList.add('like-button');
        likeButton.addEventListener('click', () => {
            post.likes++;
            likeButton.textContent = ` 👍 ${post.likes}`;
            updatePostLikes(post);
        });

        postDiv.appendChild(content);
        if (post.image) postDiv.appendChild(image);
        postDiv.appendChild(dateTime);
        postDiv.appendChild(likeButton);
        postsContainer.appendChild(postDiv);
    }

    function updatePostLikes(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.map(p => p.content === post.content ? post : p);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
});

