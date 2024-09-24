document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postsContainer = document.getElementById('postsContainer');

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const content = postContent.value.trim();
        const imageFile = postImage.files[0];

        if (content || imageFile) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            // Add timestamp
            const timestamp = document.createElement('div');
            timestamp.classList.add('timestamp');
            timestamp.textContent = new Date().toLocaleString();
            postDiv.appendChild(timestamp);

            // Add post content
            const textPara = document.createElement('p');
            textPara.textContent = content;
            postDiv.appendChild(textPara);

            // Add image if available
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    postDiv.appendChild(img);
                };
                reader.readAsDataURL(imageFile);
            }

            // Add like/dislike section
            const likeSection = document.createElement('div');
            likeSection.classList.add('like-section');

            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.innerHTML = '&#10084;'; // Heart symbol
            likeButton.dataset.count = 0; // Initialize like count
            likeButton.addEventListener('click', () => {
                likeButton.classList.toggle('liked');
                likeButton.dataset.count = likeButton.classList.contains('liked') ? parseInt(likeButton.dataset.count) + 1 : parseInt(likeButton.dataset.count) - 1;
                updateLikeCount(likeButton);
            });
            likeSection.appendChild(likeButton);

            const dislikeButton = document.createElement('button');
            dislikeButton.classList.add('dislike-button');
            dislikeButton.innerHTML = '&#10060;'; // Cross symbol
            dislikeButton.dataset.count = 0; // Initialize dislike count
            dislikeButton.addEventListener('click', () => {
                dislikeButton.classList.toggle('disliked');
                dislikeButton.dataset.count = dislikeButton.classList.contains('disliked') ? parseInt(dislikeButton.dataset.count) + 1 : parseInt(dislikeButton.dataset.count) - 1;
                updateDislikeCount(dislikeButton);
            });
            likeSection.appendChild(dislikeButton);

            postDiv.appendChild(likeSection);

            // Add comment section
            const commentSection = document.createElement('div');
            commentSection.classList.add('comment-section');
            const commentInput = document.createElement('input');
            commentInput.classList.add('comment-input');
            commentInput.placeholder = 'Add a comment...';
            const commentButton = document.createElement('button');
            commentButton.classList.add('comment-button');
            commentButton.textContent = 'Comment';

            commentButton.addEventListener('click', () => {
                if (commentInput.value.trim()) {
                    const commentText = document.createElement('p');
                    commentText.textContent = commentInput.value;
                    commentText.classList.add('comment-item');
                    commentSection.appendChild(commentText);
                    commentInput.value = ''; // Clear input
                }
            });

            commentSection.appendChild(commentInput);
            commentSection.appendChild(commentButton);
            postDiv.appendChild(commentSection);

            postsContainer.appendChild(postDiv);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });

    function updateLikeCount(button) {
        const count = button.dataset.count;
        button.textContent = count > 0 ? `Liked (${count})` : 'Like';
    }

    function updateDislikeCount(button) {
        const count = button.dataset.count;
        button.textContent = count > 0 ? `Disliked (${count})` : 'Dislike';
    }
});
