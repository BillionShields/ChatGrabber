javascript: (function() {
    var collectedAlerts = [];
    alert("Launching Scraper")
    localStorage.setItem('alerts', "");

    function saveCollectedAlerts() {
        var uniqueAlerts = [...new Set(collectedAlerts)].join('\n');
        var storedAlerts = localStorage.getItem('alerts');
        if (uniqueAlerts !== storedAlerts) {
            localStorage.setItem('alerts', uniqueAlerts);
            var alertBlob = new Blob([uniqueAlerts], { type: 'text/plain;charset=utf-8' });
            var downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(alertBlob);
            downloadLink.download = "Alerts.txt";
            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
        }
    }

    setInterval(function() {
        console.log("Checking for new alerts...");

        var rows = document.querySelectorAll('tbody[role="rowgroup"] tr[role="row"]');
        if (rows.length === 0) {
            console.log("No rows found.");
            return;
        }

        var newAlerts = [];

        rows.forEach(function(row) {
            var rowData = row.querySelector('.tokenData');
            if (!rowData) {
                console.log("No token data found.");
                return;
            }

            var twitterLink = rowData.querySelector('a.tokenIconLink[href*="twitter.com"]');
            if (!twitterLink) {
                console.log("No Twitter link found.");
                return;
            }

            var twitterHandle = twitterLink.getAttribute('href');

            var contractLink = rowData.querySelector('a.clickable');
            var contractNum = contractLink ? contractLink.getAttribute('href').split('/').pop() : '';

            var telegramLink = rowData.querySelector('a.tokenIconLink[href*="t.me"]');
            var telegramHandle = telegramLink ? telegramLink.getAttribute('href') : '';

            var alertString = `contract=${contractNum};twitter=${twitterHandle};telegram=${telegramHandle};`;

            if (!collectedAlerts.includes(alertString)) {
                console.log(`New alert found: ${alertString}`);
                collectedAlerts.push(alertString);
                newAlerts.push(alertString);
            }
        });

        if (newAlerts.length > 0) {
            console.log(`Saving ${newAlerts.length} new alert(s)...`);
            saveCollectedAlerts();
        }

    }, 60000);

    console.log("Launching Scraper");
    localStorage.setItem('alerts', "");
})();