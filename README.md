# Canon · Latex ink planning

The complete presentation, presenter console and offline backup. No local presentation server, database, external font provider or JavaScript CDN is required.

## Present

1. Open `https://cppinkplan.haegens.be/` on the presenter’s screen.
2. Use **Displays** to select the external display in Chrome or Edge, or move the audience window by hand.
3. Choose **Open audience**. In the audience window, choose **Enter fullscreen** once if the browser requires it. Return focus to the presenter console.
4. Use the blue **CLICK** button, Space, Right or Page Down. Every numbered cue is a separate click. Clicking while a build is moving completes that build and holds.

The audience window has no browser chrome in fullscreen, no visible slide controls and no speaker notes. It preserves the slide’s original 16:9 composition on any display, with black letterboxing where required. Use an extended desktop rather than screen mirroring. In Teams or Zoom, share the audience window or external display, not the presenter desktop.

## Presenter controls

- Current slide and its build progress, next slide, elapsed time, slide time and local clock.
- Full notes with numbered click buttons. **Follow cue** scrolls to the cue you trigger, allowing you to read the paragraph below it.
- Search all notes and slide titles. Click a result to jump to that slide. **O** opens the visual overview.
- **B** blacks out the audience screen and restores it. **P** pauses/resumes motion. **R** resets the current slide. Left or Page Up goes back one build.
- Change notes size, target duration and motion preferences in settings.
- Refresh recovery preserves the current slide/build. A reloaded audience window reconnects to the same presenter session. A closed audience window can be reopened.
- Keep the console and audience on the same browser profile and origin. Independent presenter tabs have independent sessions. This controls a second window on the same computer, not a remote device.

## Fullscreen and display permissions

Browsers restrict fullscreen and automatic window placement. Display detection is optional and requested only when you click its button. If automatic placement or remote fullscreen is blocked, drag the audience window to the correct display and click **Enter fullscreen** there once. The slides stay hidden behind the launch screen until fullscreen is active. Esc exits fullscreen and returns to this launch screen. All presentation control remains in the console.

The browser’s own initial fullscreen notification may appear briefly. The page cannot suppress browser or operating-system notices. Set the computer to Do Not Disturb and disable notifications before the session.

## Offline

Wait for **Ready offline** in the sidebar before disconnecting. The service worker caches the complete app, deck, notes, images, fonts and overview thumbnails. It can then reload on the same address without a connection. First use requires a successful online load. Private browsing or browser storage clearing can remove this cache.

Use the backup download in settings as a second copy. Unzip it and open `presenter.html` in Chrome. All slide imagery and fonts are embedded. File URLs support the paired windows through direct messaging, but browser security policies can limit local-file previews. The hosted, cached version is the preferred offline fallback.

## Coolify

- Build pack: **Dockerfile**
- Base directory: `/`
- Dockerfile: `/Dockerfile`
- Container port: **80**
- Domain: **http://cppinkplan.haegens.be** when Cloudflare Tunnel terminates public HTTPS. Use the same proxy setup as the existing Canon Process Explorer.
- Health check: `GET /health`, port 80, HTTP 200.
- No environment variables or secrets required.

The public hostname must route through the existing Cloudflare Tunnel to the Coolify server at `192.168.0.182:80`. A matching DNS record alone is insufficient if the tunnel has no matching ingress rule. Keep existing applications and their domain routes unchanged.

The presenter UI is `/` or `/presenter.html`. The audience opens the embedded deck with a unique session parameter. The legacy `Canon - Presenter Notes.html` and `Canon - Ink Planning Story.html` names remain available.

## Content and image credits

The planning schedules are illustrative explanations of Canon’s supplied scenario. They are not measured savings or a live SAP optimizer result. Spoken notes retain the Canon scenario references and solution caveats. SAP feature documentation is linked quietly from the conclusion and included in the slides’ sources panel.

Cover photographs: the two Canon photographs supplied by the presenter: a Canon operator on the shop floor and an engineer working on machinery. The original supplied photographs are embedded without alteration; their framing is controlled by the slide layout.

SAP logo and SAP 72 typeface are retained from the provided SAP visual materials. The title composition follows the supplied reference. The deployment does not contact an image or font CDN.
