javascript: (function() {
    const daysToCheck = ['Mon', 'Tue'];
    let output = '';

    function scanPage() {
        const timeAxisElements = document.querySelectorAll('.time-axis');
        const priceAxisElements = document.querySelectorAll('.price-axis');

        timeAxisElements.forEach(element => {
            const elementText = element.innerText;
            const elementId = element.id ? ` id="${element.id}"` : '';
            const elementClass = element.className ? ` class="${element.className}"` : '';
            const elementName = element.name ? ` name="${element.name}"` : '';

            if (daysToCheck.some(day => elementText.includes(day))) {
                output += `Element with ${day} found:${elementId}${elementClass}${elementName}\n${element.outerHTML}\n\n`;
            }

            const elementImages = element.querySelectorAll('img');

            elementImages.forEach(image => {
                const imageAlt = image.alt || image.src;

                if (daysToCheck.some(day => imageAlt.includes(day))) {
                    output += `Image with ${day} found:${elementId}${elementClass}${elementName}\n${image.outerHTML}\n\n`;
                }
            });
        });

        priceAxisElements.forEach(element => {
            const elementText = element.innerText;
            const elementId = element.id ? ` id="${element.id}"` : '';
            const elementClass = element.className ? ` class="${element.className}"` : '';
            const elementName = element.name ? ` name="${element.name}"` : '';

            if (daysToCheck.some(day => elementText.includes(day))) {
                output += `Element with ${day} found:${elementId}${elementClass}${elementName}\n${element.outerHTML}\n\n`;
            }

            const elementImages = element.querySelectorAll('img');

            elementImages.forEach(image => {
                const imageAlt = image.alt || image.src;

                if (daysToCheck.some(day => imageAlt.includes(day))) {
                    output += `Image with ${day} found:${elementId}${elementClass}${elementName}\n${image.outerHTML}\n\n`;
                }
            });
        });
    }

    function saveToFile() {
        const file = new Blob([output], { type: 'text/plain' });
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);

        a.href = url;
        a.download = 'scan_results.txt';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    setInterval(function() {
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey) {
                scanPage();
                saveToFile();
                output = '';
            }
        });
    }, 10000);
})();