document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let input = '';
    let missYouMode = false;

    function updateDisplay() {
        if (missYouMode) {
            display.textContent = 'I miss you 🥺👉👈';
            display.style.justifyContent = 'center';
            display.style.fontSize = '1.5rem';
        } else {
            display.textContent = input || '0';
            display.style.justifyContent = 'flex-end';
            display.style.fontSize = '2.5rem';
        }
    }

    function playVideo(event) {
        console.log('Clipboard clicked:', event.currentTarget.id);
        const clipboard = event.currentTarget;
        let video, defaultText;

        if (clipboard.id === 'left-clip') {
            video = document.getElementById('inloveVideo');
            defaultText = 'Are you in love?';
        } else if (clipboard.id === 'right-clip') {
            video = document.getElementById('brokenVideo');
            defaultText = 'Did someone break your heart?';
        }

        let videoClone = clipboard.querySelector('video');
        if (videoClone) videoClone.remove();
        
        videoClone = video.cloneNode(true);
        videoClone.style.display = 'block';
        videoClone.controls = true;
        videoClone.style.width = '100%';
        videoClone.style.height = '100%';
        videoClone.style.position = 'absolute';
        videoClone.style.top = '0';
        videoClone.style.left = '0';
        
        clipboard.innerHTML = '';
        clipboard.appendChild(videoClone);
        
        videoClone.play().catch(error => {
            console.error('Video play failed:', error);
            clipboard.textContent = `${defaultText} (Video error)`;
        });
        
        videoClone.addEventListener('ended', () => {
            videoClone.remove();
            clipboard.textContent = defaultText;
        });
    }

    // Attach event listeners with debug logs
    const leftClip = document.getElementById('left-clip');
    const rightClip = document.getElementById('right-clip');
    if (leftClip) {
        leftClip.addEventListener('click', playVideo);
        console.log('Left clipboard event listener attached');
    } else {
        console.log('Left clipboard element not found');
    }
    if (rightClip) {
        rightClip.addEventListener('click', playVideo);
        console.log('Right clipboard event listener attached');
    } else {
        console.log('Right clipboard element not found');
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Button clicked:', btn.textContent.trim());
            const value = btn.textContent.trim();
            if (value === '=') {
                missYouMode = true;
            } else if (value === 'C' || value === 'CE') {
                input = '';
                missYouMode = false;
            } else if (!missYouMode) {
                input += value;
            }
            updateDisplay();
        });
    });

    console.log('Initial display update');
    updateDisplay();
});