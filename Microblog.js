document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postsContainer = document.getElementById('postsContainer');

    // Load posts from local storage on page load
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
            likes: 0,
            dislikes: 0,
            comments: []
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

        const dislikeButton = document.createElement('span');
        dislikeButton.textContent = ` 👎 ${post.dislikes}`;
        dislikeButton.classList.add('dislike-button');
        dislikeButton.addEventListener('click', () => {
            post.dislikes++;
            dislikeButton.textContent = ` 👎 ${post.dislikes}`;
            updatePostDislikes(post);
        });

        const commentInput = document.createElement('input');
        commentInput.placeholder = "Add a comment...";
        const commentButton = document.createElement('button');
        commentButton.textContent = "Comment";

        commentButton.addEventListener('click', () => {
            const comment = commentInput.value;
            if (comment) {
                post.comments.push(comment);
                savePostComments(post);
                displayComment(post, comment);
                commentInput.value = ''; // Clear input
            }
        });

        const commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments');

        // Display existing comments
        post.comments.forEach(comment => displayComment(post, comment));

        postDiv.appendChild(content);
        if (post.image) postDiv.appendChild(image);
        postDiv.appendChild(dateTime);
        postDiv.appendChild(likeButton);
        postDiv.appendChild(dislikeButton);
        postDiv.appendChild(commentInput);
        postDiv.appendChild(commentButton);
        postDiv.appendChild(commentsDiv);
        postsContainer.appendChild(postDiv);
    }

    function displayComment(post, comment) {
        const commentsDiv = Array.from(postsContainer.children).find(div => div.querySelector('small').textContent === post.dateTime).querySelector('.comments');
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = comment;
        commentsDiv.appendChild(commentDiv);
    }

    function updatePostLikes(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.map(p => (p.dateTime === post.dateTime && p.content === post.content) ? post : p);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function updatePostDislikes(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.map(p => (p.dateTime === post.dateTime && p.content === post.content) ? post : p);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function savePostComments(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.map(p => (p.dateTime === post.dateTime && p.content === post.content) ? post : p);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
});
