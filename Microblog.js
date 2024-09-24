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

            // Initialize like count
            let likeCount = 0;

            // Add image if available
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%'; // Make sure the image fits
                    postDiv.appendChild(img);
                };
                reader.readAsDataURL(imageFile);
            }

            // Add like section
            const likeSection = document.createElement('div');
            likeSection.classList.add('like-section');

            // Add heart button
            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.innerHTML = '&#10084;'; // Unicode heart symbol

            // Add like text
            const likeText = document.createElement('span');
            likeText.classList.add('like-text');
            likeText.textContent = ' Like (0)'; // Initial like text

            likeButton.addEventListener('click', () => {
                likeButton.classList.toggle('liked');
                likeText.textContent = ` Like (${likeButton.classList.contains('liked') ? ++likeCount : --likeCount})`;
                likeText.classList.toggle('liked', likeButton.classList.contains('liked'));
            });

            likeSection.appendChild(likeButton);
            likeSection.appendChild(likeText);
            postDiv.appendChild(likeSection);

            postsContainer.appendChild(postDiv);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });
});
