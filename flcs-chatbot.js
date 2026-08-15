(function () {
    // 1. Inject Isolated CSS Protection Rules directly into the document head
    const style = document.createElement('style');
    style.innerHTML = `
:root {
    --flcs-blue: #35afb6;
    --flcs-bg: #fff;
    --flcs-font: 'Poppins', sans-serif;
}

#flcs-widget-container {
    position: relative;
    z-index: 2147483647;
}

/* Launcher Button */
.flcs-launcher {
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 65px;
    height: 65px;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: grid;
    place-items: center;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
}

.flcs-launcher:hover {
    transform: scale(1.1);
}

/* --- LOGO STACKING --- */
.flcs-logo-default,
.flcs-logo-special {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s ease-in-out;
    backface-visibility: hidden;
}

/* NORMAL LOGO */
.flcs-logo-default svg {
    width: 100%;
    height: 100%;
}

/* SPECIAL LOGO */
.flcs-logo-special {
    font-size: 32px;
    opacity: 0;
    transform: rotateY(180deg);
    background: white;
    border-radius: 50%;
    border: 2px solid #35afb6;
    width: 60px;
    height: 60px;
}

/* --- ANIMATION CYCLE --- */
.flcs-animating .flcs-logo-default {
    animation: flipHide 8s infinite ease-in-out;
}

.flcs-animating .flcs-logo-special {
    animation: flipShow 8s infinite ease-in-out;
}

@keyframes flipHide {
    0%, 45% {
        opacity: 1;
        transform: rotateY(0deg);
    }

    50%, 95% {
        opacity: 0;
        transform: rotateY(180deg);
    }

    100% {
        opacity: 1;
        transform: rotateY(360deg);
    }
}

@keyframes flipShow {
    0%, 45% {
        opacity: 0;
        transform: rotateY(-180deg);
    }

    50%, 95% {
        opacity: 1;
        transform: rotateY(0deg);
    }

    100% {
        opacity: 0;
        transform: rotateY(180deg);
    }
}

/* Standard Window CSS */
.flcs-window {
    position: fixed;
    bottom: 100px;
    right: 25px;
    width: 380px;
    max-width: 90vw;
    height: 600px;
    max-height: 70vh;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: var(--flcs-font);
    transition: opacity 0.3s, transform 0.3s;
    transform-origin: bottom right;
    opacity: 1;
    transform: scale(1);
}

.flcs-window.hidden {
    opacity: 0;
    transform: scale(0.9);
    pointer-events: none;
    display: none !important;
}

.flcs-window.expanded {
    width: 90vw;
    height: 90vh;
    bottom: 50px;
    right: 50px;
}

.flcs-header {
    background: #35afb6;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    flex-shrink: 0;
}

.flcs-controls button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.8;
    padding: 0 5px;
    font-size: 1.2rem;
}

.flcs-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f9f9f9;
}

.flcs-msg {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 18px;
    font-size: 0.85rem;
    line-height: 1.4;
    word-wrap: break-word;
    color: #333;
}

.flcs-msg.bot {
    align-self: flex-start;
    background: #e9e9eb;
    border-bottom-left-radius: 4px;
}

.flcs-msg.user {
    align-self: flex-end;
    background: #35afb6;
    color: white;
    border-bottom-right-radius: 4px;
}

.flcs-msg p {
    margin: 0 0 5px;
}

.flcs-msg ul {
    margin: 5px 0 5px 20px;
    padding: 0;
}

.flcs-msg strong {
    font-weight: 600;
}

.flcs-typing {
    padding: 10px 15px;
    display: flex;
    gap: 4px;
}

.flcs-dot {
    width: 6px;
    height: 6px;
    background: #bbb;
    border-radius: 50%;
    animation: flcs-blink 1.2s infinite;
}

.flcs-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.flcs-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes flcs-blink {
    0%,100% {
        opacity: 0.4;
    }

    50% {
        opacity: 1;
    }
}

.flcs-buttons {
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    border-top: 1px solid #eee;
    background: white;
}

.flcs-btn {
    background: white;
    border: 1px solid #35afb6;
    color: #35afb6;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.75rem;
    cursor: pointer;
    font-family: var(--flcs-font);
}

.flcs-btn:hover {
    background: #35afb6;
    color: white;
}

.flcs-input-area {
    display: flex;
    padding: 10px;
    border-top: 1px solid #eee;
    background: white;
}

.flcs-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    font-family: var(--flcs-font);
    font-size: 1rem;
}

.flcs-input:focus {
    border-color: #35afb6;
}

.flcs-send {
    background: #35afb6;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
}

.flcs-send {
    background: #35afb6 !important;
    color: white !important;
    border: none !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important;
    margin-left: 10px !important;
    cursor: pointer !important;
    display: grid !important;
    place-items: center !important;
    font-size: 1.2rem !important;
}

#flcs-widget-container .hidden {
    display: none !important;
}
    `;

    document.head.appendChild(style);

    // 2. Generate and Append Widget Layout
    const container = document.createElement('div');
    container.id = 'flcs-widget-container';

    container.innerHTML = `
<div id="flcs-widget-container">

    <div class="flcs-launcher" id="flcs-launch" title="Chat with Us">

        <!-- NORMAL LOGO -->
        <div class="flcs-logo-default">
            <svg
                width="64"
                height="64"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="bubbleGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style="stop-color:#35afb6;stop-opacity:1"
                        />

                        <stop
                            offset="100%"
                            style="stop-color:#2c9aa0;stop-opacity:1"
                        />
                    </linearGradient>
                </defs>

                <rect
                    x="10"
                    y="10"
                    width="80"
                    height="70"
                    rx="20"
                    ry="20"
                    fill="url(#bubbleGradient)"
                />

                <path
                    d="M30 80 L30 95 L50 80 Z"
                    fill="url(#bubbleGradient)"
                />

                <circle cx="35" cy="45" r="5" fill="white" />
                <circle cx="50" cy="45" r="5" fill="white" />
                <circle cx="65" cy="45" r="5" fill="white" />
            </svg>
        </div>

        <!-- SPECIAL LOGO -->
        <div
            class="flcs-logo-special"
            id="flcs-special-icon"
        ></div>

    </div>

    <!-- Chat Window -->
    <div class="flcs-window hidden" id="flcs-window">

        <div class="flcs-header">
            <span>Flyers Buddy</span>

            <div class="flcs-controls">
                <button id="flcs-expand">□</button>
                <button id="flcs-close">×</button>
            </div>
        </div>

        <div
            class="flcs-messages"
            id="flcs-msgs"
        ></div>

        <div
            class="flcs-typing hidden"
            id="flcs-typing"
        >
            <div class="flcs-dot"></div>
            <div class="flcs-dot"></div>
            <div class="flcs-dot"></div>
        </div>

        <div
            class="flcs-buttons"
            id="flcs-btns"
        ></div>

        <form
            class="flcs-input-area"
            id="flcs-form"
        >
            <input
                type="text"
                class="flcs-input"
                id="flcs-input"
                placeholder="Type a message..."
                autocomplete="off"
            >

            <button
                type="submit"
                class="flcs-send"
            >
                ➤
            </button>
        </form>

    </div>

</div>
    `;

    document.body.appendChild(container);

    // 3. Operational Script Context Logic

    // Backend URL
    const BASE_URL = "https://api.flcs.in";

    // API key intentionally removed.
    // Backend no longer requires Authorization header.

    // --- HOLIDAY CALENDAR ---
    const specialLogos = {
        "12-25": "🎄",
        "01-01": "🎉",
        "08-15": "🇮🇳",
        "01-26": "🇮🇳",
        "10-31": "🎃"
    };

    function checkDate() {
        const d = new Date();

        const key =
            String(d.getMonth() + 1).padStart(2, '0') +
            "-" +
            String(d.getDate()).padStart(2, '0');

        if (specialLogos[key]) {
            document.getElementById("flcs-special-icon").textContent =
                specialLogos[key];

            document
                .getElementById("flcs-launch")
                .classList.add("flcs-animating");
        }
    }

    checkDate();

    // --- Chat Logic ---
    const els = {
        l: document.getElementById("flcs-launch"),
        w: document.getElementById("flcs-window"),
        m: document.getElementById("flcs-msgs"),
        i: document.getElementById("flcs-input"),
        f: document.getElementById("flcs-form"),
        t: document.getElementById("flcs-typing"),
        b: document.getElementById("flcs-btns")
    };

    let open = false;

    function toggle() {

        if (els.w.classList.contains("hidden")) {

            els.w.classList.remove("hidden");
            els.w.style.display = "flex";
            els.i.focus();

            if (!open) {

                send("hello", true);

                // Track widget view.
                // No API key or Authorization header.
                fetch(`${BASE_URL}/api/track_view`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).catch((e) =>
                    console.error(
                        "Tracking log dropped safely:",
                        e
                    )
                );

                open = true;
            }

        } else {

            els.w.classList.add("hidden");

        }
    }

    document.getElementById("flcs-expand").onclick =
        () => els.w.classList.toggle("expanded");

    document.getElementById("flcs-close").onclick =
        toggle;

    els.l.onclick = toggle;

    function msg(txt, s) {

        const d = document.createElement("div");

        d.className = `flcs-msg ${s}`;

        let h = txt
            .replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
            )
            .replace(
                /\n/g,
                '<br>'
            );

        if (window.marked) {
            h = marked.parse(txt);
        }

        d.innerHTML = h;

        els.m.appendChild(d);

        els.m.scrollTop = els.m.scrollHeight;
    }

    function btns(arr) {

        els.b.innerHTML = "";

        if (!arr || !arr.length) {
            els.b.style.display = "none";
            return;
        }

        els.b.style.display = "flex";

        arr.forEach(t => {

            const b = document.createElement("button");

            b.className = "flcs-btn";

            b.textContent = t;

            b.onclick = () => send(t);

            els.b.appendChild(b);
        });
    }

    async function send(txt, sil = false) {

        if (!txt.trim()) {
            return;
        }

        if (!sil) {
            msg(txt, "user");
        }

        els.i.value = "";

        els.t.classList.remove("hidden");

        btns([]);

        els.m.scrollTop = els.m.scrollHeight;

        try {

            const r = await fetch(
                `${BASE_URL}/api/chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        query: txt
                    })
                }
            );

            if (!r.ok) {
                throw new Error(
                    `HTTP ${r.status}`
                );
            }

            const d = await r.json();

            els.t.classList.add("hidden");

            msg(
                d.markdown || "Error",
                "bot"
            );

            btns(
                d.buttons || []
            );

        } catch (e) {

            console.error(
                "Chat request failed:",
                e
            );

            els.t.classList.add("hidden");

            msg(
                "⚠️ Connection Error",
                "bot"
            );
        }
    }

    els.f.onsubmit = (e) => {

        e.preventDefault();

        send(els.i.value);

    };

})();
