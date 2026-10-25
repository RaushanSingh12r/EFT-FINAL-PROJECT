// SignBridge language support: English, Hindi, Tamil, Telugu, Kannada.
// Translates elements marked with data-i18n (and data-i18n-ph for placeholders).
// Index-page elements are tagged automatically from the INDEX_MAP below.
(function () {
  "use strict";

  const LANGS = {
    en: { label: "English", speech: "en-IN" },
    hi: { label: "हिन्दी (Hindi)", speech: "hi-IN" },
    ta: { label: "தமிழ் (Tamil)", speech: "ta-IN" },
    te: { label: "తెలుగు (Telugu)", speech: "te-IN" },
    kn: { label: "ಕನ್ನಡ (Kannada)", speech: "kn-IN" }
  };

  // key: [en, hi, ta, te, kn]
  const T = {
    nav_home: ["Home", "होम", "முகப்பு", "హోమ్", "ಮುಖಪುಟ"],
    nav_communicate: ["Communicate", "संवाद", "தொடர்பு", "సంభాషణ", "ಸಂವಹನ"],
    nav_learn: ["Learn", "सीखें", "கற்க", "నేర్చుకోండి", "ಕಲಿಯಿರಿ"],
    nav_vocab: ["Vocabulary", "शब्दावली", "சொற்களஞ்சியம்", "పదజాలం", "ಶಬ್ದಕೋಶ"],
    nav_quiz: ["Quiz", "प्रश्नोत्तरी", "வினாடி வினா", "క్విజ్", "ರಸಪ್ರಶ್ನೆ"],
    nav_about: ["About", "हमारे बारे में", "பற்றி", "మా గురించి", "ಕುರಿತು"],
    nav_isl: ["ISL Resources", "ISL संसाधन", "ISL வளங்கள்", "ISL వనరులు", "ISL ಸಂಪನ್ಮೂಲಗಳು"],
    nav_alpha: ["A–Z Alphabet", "A–Z वर्णमाला", "A–Z எழுத்துகள்", "A–Z అక్షరమాల", "A–Z ವರ್ಣಮಾಲೆ"],

    login: ["Log in", "लॉग इन", "உள்நுழை", "లాగిన్", "ಲಾಗಿನ್"],
    signup: ["Sign up", "साइन अप", "பதிவு செய்", "సైన్ అప్", "ಸೈನ್ ಅಪ್"],
    logout: ["Log out", "लॉग आउट", "வெளியேறு", "లాగ్ అవుట్", "ಲಾಗ್ ಔಟ್"],
    hi_user: ["Hi,", "नमस्ते,", "வணக்கம்,", "నమస్తే,", "ನಮಸ್ಕಾರ,"],
    a11y_btn: ["♿ Accessibility", "♿ सुगम्यता", "♿ அணுகல்தன்மை", "♿ యాక్సెసిబిలిటీ", "♿ ಪ್ರವೇಶಸಾಧ್ಯತೆ"],
    a11y_title: ["Accessibility Settings", "सुगम्यता सेटिंग्स", "அணுகல்தன்மை அமைப்புகள்", "యాక్సెసిబిలిటీ సెట్టింగ్‌లు", "ಪ್ರವೇಶಸಾಧ್ಯತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು"],
    a11y_desc: ["Adjust the website to suit your needs.", "वेबसाइट को अपनी ज़रूरत के अनुसार बदलें।", "இணையதளத்தை உங்கள் தேவைக்கேற்ப மாற்றுங்கள்.", "వెబ్‌సైట్‌ను మీ అవసరాలకు తగ్గట్టు మార్చుకోండి.", "ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಹೊಂದಿಸಿ."],
    a11y_text: ["Text Size", "टेक्स्ट का आकार", "எழுத்தின் அளவு", "అక్షరాల పరిమాణం", "ಅಕ್ಷರ ಗಾತ್ರ"],
    a11y_contrast: ["High Contrast", "हाई कॉन्ट्रास्ट", "அதிக மாறுபாடு", "హై కాంట్రాస్ట్", "ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್"],
    a11y_reading: ["Reading Mode", "रीडिंग मोड", "வாசிப்பு முறை", "రీడింగ్ మోడ్", "ಓದುವ ಮೋಡ್"],
    a11y_reset: ["Reset Settings", "सेटिंग्स रीसेट करें", "அமைப்புகளை மீட்டமை", "సెట్టింగ్‌లను రీసెట్ చేయండి", "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ"],
    lang_label: ["Language", "भाषा", "மொழி", "భాష", "ಭಾಷೆ"],

    hero_eyebrow: ["COMMUNICATION WITHOUT BARRIERS", "बिना बाधा के संवाद", "தடைகளற்ற தொடர்பு", "అడ్డంకులు లేని సంభాషణ", "ಅಡೆತಡೆಗಳಿಲ್ಲದ ಸಂವಹನ"],
    hero_h1: [
      "Every voice matters.<br><span>Every sign connects.</span>",
      "हर आवाज़ मायने रखती है।<br><span>हर संकेत जोड़ता है।</span>",
      "ஒவ்வொரு குரலும் முக்கியம்.<br><span>ஒவ்வொரு சைகையும் இணைக்கும்.</span>",
      "ప్రతి స్వరం ముఖ్యమే.<br><span>ప్రతి సంజ్ఞ కలుపుతుంది.</span>",
      "ಪ್ರತಿ ಧ್ವನಿಯೂ ಮುಖ್ಯ.<br><span>ಪ್ರತಿ ಸಂಕೇತವೂ ಬೆಸೆಯುತ್ತದೆ.</span>"
    ],
    hero_desc: [
      "A friendly place to explore sign language, share everyday messages, and learn at your own pace.",
      "सांकेतिक भाषा सीखने, रोज़मर्रा के संदेश साझा करने और अपनी गति से सीखने की एक दोस्ताना जगह।",
      "சைகை மொழியை ஆராய, அன்றாட செய்திகளைப் பகிர, உங்கள் வேகத்தில் கற்க ஒரு நட்பான இடம்.",
      "సంజ్ఞా భాషను తెలుసుకోవడానికి, రోజువారీ సందేశాలను పంచుకోవడానికి, మీ వేగంతో నేర్చుకోవడానికి స్నేహపూర్వక వేదిక.",
      "ಸಂಕೇತ ಭಾಷೆಯನ್ನು ಅನ್ವೇಷಿಸಲು, ದೈನಂದಿನ ಸಂದೇಶಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಮತ್ತು ನಿಮ್ಮದೇ ವೇಗದಲ್ಲಿ ಕಲಿಯಲು ಸ್ನೇಹಪರ ತಾಣ."
    ],
    hero_start: ["Start Communicating <span aria-hidden=\"true\">→</span>", "संवाद शुरू करें <span aria-hidden=\"true\">→</span>", "தொடர்பைத் தொடங்கு <span aria-hidden=\"true\">→</span>", "సంభాషణ ప్రారంభించండి <span aria-hidden=\"true\">→</span>", "ಸಂವಹನ ಆರಂಭಿಸಿ <span aria-hidden=\"true\">→</span>"],
    hero_explore: ["Explore Lessons", "पाठ देखें", "பாடங்களைப் பார்", "పాఠాలను చూడండి", "ಪಾಠಗಳನ್ನು ನೋಡಿ"],
    hero_note: ["Designed with accessibility, clarity, and inclusion in mind.", "सुगम्यता, स्पष्टता और समावेश को ध्यान में रखकर बनाया गया।", "அணுகல்தன்மை, தெளிவு, அனைவரையும் உள்ளடக்குதல் ஆகியவற்றை மனதில் கொண்டு உருவாக்கப்பட்டது.", "యాక్సెసిబిలిటీ, స్పష్టత, అందరినీ కలుపుకోవడం దృష్టిలో ఉంచుకుని రూపొందించబడింది.", "ಪ್ರವೇಶಸಾಧ್ಯತೆ, ಸ್ಪಷ್ಟತೆ ಮತ್ತು ಒಳಗೊಳ್ಳುವಿಕೆಯನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡು ರೂಪಿಸಲಾಗಿದೆ."],
    chip1: ["👋 Greetings", "👋 अभिवादन", "👋 வாழ்த்துகள்", "👋 శుభాకాంక్షలు", "👋 ಶುಭಾಶಯಗಳು"],
    chip2: ["💬 Clear communication", "💬 स्पष्ट संवाद", "💬 தெளிவான தொடர்பு", "💬 స్పష్టమైన సంభాషణ", "💬 ಸ್ಪಷ್ಟ ಸಂವಹನ"],
    chip3: ["♥ Learn together", "♥ साथ मिलकर सीखें", "♥ சேர்ந்து கற்போம்", "♥ కలిసి నేర్చుకుందాం", "♥ ಒಟ್ಟಿಗೆ ಕಲಿಯೋಣ"],
    card_hello: ["HELLO!", "नमस्ते!", "வணக்கம்!", "నమస్తే!", "ನಮಸ್ಕಾರ!"],
    card_sub: ["Let's connect", "चलो जुड़ें", "இணைவோம்", "కలుద్దాం", "ಬೆಸೆಯೋಣ"],

    com_eyebrow: ["COMMUNICATE MODE", "संवाद मोड", "தொடர்பு முறை", "సంభాషణ మోడ్", "ಸಂವಹನ ಮೋಡ್"],
    com_h2: ["Say it your way", "अपने तरीके से कहें", "உங்கள் வழியில் சொல்லுங்கள்", "మీ శైలిలో చెప్పండి", "ನಿಮ್ಮ ರೀತಿಯಲ್ಲಿ ಹೇಳಿ"],
    com_p: [
      "Type a message and explore matching signs from the sample library. You can also hear your message spoken aloud.",
      "संदेश लिखें और नमूना लाइब्रेरी से मेल खाते संकेत देखें। आप अपना संदेश बोलकर सुन भी सकते हैं।",
      "செய்தியை தட்டச்சு செய்து மாதிரி நூலகத்தில் பொருந்தும் சைகைகளைப் பாருங்கள். உங்கள் செய்தியை உரக்கக் கேட்கவும் முடியும்.",
      "సందేశాన్ని టైప్ చేసి నమూనా లైబ్రరీలోని సంజ్ఞలను చూడండి. మీ సందేశాన్ని బిగ్గరగా వినవచ్చు కూడా.",
      "ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ ಮಾದರಿ ಗ್ರಂಥಾಲಯದ ಹೊಂದುವ ಸಂಕೇತಗಳನ್ನು ನೋಡಿ. ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಗಟ್ಟಿಯಾಗಿ ಕೇಳಲೂಬಹುದು."
    ],
    com_label: ["Your message", "आपका संदेश", "உங்கள் செய்தி", "మీ సందేశం", "ನಿಮ್ಮ ಸಂದೇಶ"],
    com_speak: ["🎤 Speak Message", "🎤 संदेश बोलें", "🎤 செய்தியைப் பேசு", "🎤 సందేశాన్ని చెప్పండి", "🎤 ಸಂದೇಶ ಹೇಳಿ"],
    com_qm: ["Quick Messages", "त्वरित संदेश", "விரைவு செய்திகள்", "త్వరిత సందేశాలు", "ತ್ವರಿತ ಸಂದೇಶಗಳು"],
    com_qm_p: ["Select a message to communicate quickly.", "जल्दी संवाद के लिए कोई संदेश चुनें।", "விரைவாகத் தொடர்பு கொள்ள ஒரு செய்தியைத் தேர்ந்தெடுக்கவும்.", "త్వరగా సంభాషించడానికి ఒక సందేశాన్ని ఎంచుకోండి.", "ಬೇಗ ಸಂವಹಿಸಲು ಒಂದು ಸಂದೇಶವನ್ನು ಆರಿಸಿ."],
    com_spoken: ["Spoken language", "बोलने की भाषा", "பேசும் மொழி", "మాట్లాడే భాష", "ಮಾತನಾಡುವ ಭಾಷೆ"],
    com_show: ["Show signs", "संकेत दिखाएँ", "சைகைகளைக் காட்டு", "సంజ్ఞలను చూపించు", "ಸಂಕೇತಗಳನ್ನು ತೋರಿಸಿ"],
    com_listen: ["▶ Listen", "▶ सुनें", "▶ கேள்", "▶ వినండి", "▶ ಕೇಳಿ"],
    com_disc: [
      "Demo note: sample cards are placeholders, not verified sign-language translations. Replace them with reviewed Indian Sign Language media before real-world use.",
      "डेमो नोट: नमूना कार्ड केवल प्लेसहोल्डर हैं, सत्यापित सांकेतिक भाषा अनुवाद नहीं। वास्तविक उपयोग से पहले इन्हें समीक्षित भारतीय सांकेतिक भाषा सामग्री से बदलें।",
      "டெமோ குறிப்பு: மாதிரி அட்டைகள் தற்காலிகமானவை, சரிபார்க்கப்பட்ட சைகை மொழி மொழிபெயர்ப்புகள் அல்ல. உண்மையான பயன்பாட்டுக்கு முன் மதிப்பாய்வு செய்யப்பட்ட இந்திய சைகை மொழி உள்ளடக்கத்தால் மாற்றவும்.",
      "డెమో గమనిక: నమూనా కార్డులు కేవలం ప్లేస్‌హోల్డర్లు, ధృవీకరించిన సంజ్ఞా భాషా అనువాదాలు కావు. నిజ వినియోగానికి ముందు సమీక్షించిన భారతీయ సంజ్ఞా భాషా మీడియాతో వాటిని మార్చండి.",
      "ಡೆಮೊ ಟಿಪ್ಪಣಿ: ಮಾದರಿ ಕಾರ್ಡ್‌ಗಳು ತಾತ್ಕಾಲಿಕ, ಪರಿಶೀಲಿತ ಸಂಕೇತ ಭಾಷಾ ಅನುವಾದಗಳಲ್ಲ. ನಿಜವಾದ ಬಳಕೆಗೆ ಮೊದಲು ಪರಿಶೀಲಿತ ಭಾರತೀಯ ಸಂಕೇತ ಭಾಷಾ ಮಾಧ್ಯಮದಿಂದ ಬದಲಾಯಿಸಿ."
    ],

    learn_eyebrow: ["LEARN MODE", "सीखने का मोड", "கற்றல் முறை", "నేర్చుకునే మోడ్", "ಕಲಿಕಾ ಮೋಡ್"],
    learn_h2: ["Small lessons. Real progress.", "छोटे पाठ। असली प्रगति।", "சிறு பாடங்கள். உண்மையான முன்னேற்றம்.", "చిన్న పాఠాలు. నిజమైన పురోగతి.", "ಸಣ್ಣ ಪಾಠಗಳು. ನಿಜವಾದ ಪ್ರಗತಿ."],
    learn_p: [
      "Choose a category to explore a starter lesson. More signs, quizzes, and saved progress can be added next.",
      "शुरुआती पाठ देखने के लिए कोई श्रेणी चुनें। आगे और संकेत, प्रश्नोत्तरी और सहेजी गई प्रगति जोड़ी जा सकती है।",
      "தொடக்கப் பாடத்தைப் பார்க்க ஒரு வகையைத் தேர்ந்தெடுக்கவும். மேலும் சைகைகள், வினாடி வினாக்கள், சேமித்த முன்னேற்றம் பின்னர் சேர்க்கப்படலாம்.",
      "ప్రారంభ పాఠాన్ని చూడటానికి ఒక వర్గాన్ని ఎంచుకోండి. మరిన్ని సంజ్ఞలు, క్విజ్‌లు, సేవ్ చేసిన పురోగతిని తర్వాత జోడించవచ్చు.",
      "ಆರಂಭಿಕ ಪಾಠ ನೋಡಲು ಒಂದು ವರ್ಗವನ್ನು ಆರಿಸಿ. ಮುಂದೆ ಇನ್ನಷ್ಟು ಸಂಕೇತಗಳು, ರಸಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಉಳಿಸಿದ ಪ್ರಗತಿಯನ್ನು ಸೇರಿಸಬಹುದು."
    ],
    vocab_eyebrow: ["EXPLORE WORDS", "शब्द खोजें", "சொற்களை ஆராயுங்கள்", "పదాలను అన్వేషించండి", "ಪದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ"],
    vocab_h2: ["Vocabulary Explorer", "शब्दावली एक्सप्लोरर", "சொற்களஞ்சிய ஆய்வு", "పదజాల అన్వేషణ", "ಶಬ್ದಕೋಶ ಅನ್ವೇಷಕ"],
    vocab_p: [
      "Search everyday words, explore categories, and listen to their pronunciation.",
      "रोज़मर्रा के शब्द खोजें, श्रेणियाँ देखें और उनका उच्चारण सुनें।",
      "அன்றாடச் சொற்களைத் தேடுங்கள், வகைகளை ஆராயுங்கள், உச்சரிப்பைக் கேளுங்கள்.",
      "రోజువారీ పదాలను వెతకండి, వర్గాలను చూడండి, వాటి ఉచ్చారణ వినండి.",
      "ದೈನಂದಿನ ಪದಗಳನ್ನು ಹುಡುಕಿ, ವರ್ಗಗಳನ್ನು ನೋಡಿ, ಉಚ್ಚಾರಣೆಯನ್ನು ಕೇಳಿ."
    ],
    quiz_eyebrow: ["TEST YOUR KNOWLEDGE", "अपना ज्ञान परखें", "உங்கள் அறிவைச் சோதியுங்கள்", "మీ జ్ఞానాన్ని పరీక్షించుకోండి", "ನಿಮ್ಮ ಜ್ಞಾನ ಪರೀಕ್ಷಿಸಿ"],
    quiz_h2: ["SignBridge Learning Quiz", "SignBridge लर्निंग क्विज़", "SignBridge கற்றல் வினாடி வினா", "SignBridge లెర్నింగ్ క్విజ్", "SignBridge ಕಲಿಕಾ ರಸಪ್ರಶ್ನೆ"],
    quiz_p: [
      "Test your communication awareness and learn something new with every question.",
      "अपनी संवाद जागरूकता परखें और हर सवाल के साथ कुछ नया सीखें।",
      "உங்கள் தொடர்பு விழிப்புணர்வைச் சோதித்து ஒவ்வொரு கேள்வியிலும் புதியது கற்றுக்கொள்ளுங்கள்.",
      "మీ సంభాషణ అవగాహనను పరీక్షించుకోండి, ప్రతి ప్రశ్నతో కొత్తది నేర్చుకోండి.",
      "ನಿಮ್ಮ ಸಂವಹನ ಅರಿವನ್ನು ಪರೀಕ್ಷಿಸಿ, ಪ್ರತಿ ಪ್ರಶ್ನೆಯೊಂದಿಗೆ ಹೊಸದನ್ನು ಕಲಿಯಿರಿ."
    ],
    ban_eyebrow: ["BUILT FOR EVERYONE", "सबके लिए बना", "அனைவருக்குமாக உருவானது", "అందరి కోసం రూపొందించబడింది", "ಎಲ್ಲರಿಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ"],
    ban_h2: ["Learning is better together.", "साथ मिलकर सीखना बेहतर है।", "சேர்ந்து கற்பது சிறந்தது.", "కలిసి నేర్చుకోవడం మరింత మంచిది.", "ಒಟ್ಟಿಗೆ ಕಲಿಯುವುದು ಉತ್ತಮ."],
    ban_p: [
      "SignBridge aims to help people communicate and learn with confidence.",
      "SignBridge का लक्ष्य लोगों को आत्मविश्वास से संवाद करने और सीखने में मदद करना है।",
      "மக்கள் நம்பிக்கையுடன் தொடர்பு கொள்ளவும் கற்கவும் SignBridge உதவுகிறது.",
      "ప్రజలు ఆత్మవిశ్వాసంతో సంభాషించడానికి, నేర్చుకోవడానికి SignBridge తోడ్పడుతుంది.",
      "ಜನರು ವಿಶ್ವಾಸದಿಂದ ಸಂವಹಿಸಲು ಮತ್ತು ಕಲಿಯಲು SignBridge ನೆರವಾಗುತ್ತದೆ."
    ],
    ban_btn: ["Try the demo ↑", "डेमो आज़माएँ ↑", "டெமோவை முயற்சி ↑", "డెమో ప్రయత్నించండి ↑", "ಡೆಮೊ ಪ್ರಯತ್ನಿಸಿ ↑"],

    // Auth pages
    auth_back: ["← Back to home", "← होम पर वापस", "← முகப்புக்குத் திரும்பு", "← హోమ్‌కు తిరిగి", "← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"],
    login_title: ["Welcome back", "वापसी पर स्वागत है", "மீண்டும் வருக", "తిరిగి స్వాగతం", "ಮರಳಿ ಸ್ವಾಗತ"],
    login_sub: ["Log in to continue learning with SignBridge.", "SignBridge के साथ सीखना जारी रखने के लिए लॉग इन करें।", "SignBridge உடன் கற்றலைத் தொடர உள்நுழையவும்.", "SignBridge తో నేర్చుకోవడం కొనసాగించడానికి లాగిన్ అవ్వండి.", "SignBridge ನೊಂದಿಗೆ ಕಲಿಕೆ ಮುಂದುವರಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ."],
    signup_title: ["Create your account", "अपना खाता बनाएँ", "உங்கள் கணக்கை உருவாக்குங்கள்", "మీ ఖాతాను సృష్టించండి", "ನಿಮ್ಮ ಖಾತೆ ರಚಿಸಿ"],
    signup_sub: ["Join SignBridge and start learning at your own pace.", "SignBridge से जुड़ें और अपनी गति से सीखना शुरू करें।", "SignBridge-இல் சேர்ந்து உங்கள் வேகத்தில் கற்கத் தொடங்குங்கள்.", "SignBridge లో చేరి మీ వేగంతో నేర్చుకోవడం ప్రారంభించండి.", "SignBridge ಗೆ ಸೇರಿ ನಿಮ್ಮದೇ ವೇಗದಲ್ಲಿ ಕಲಿಯಲು ಆರಂಭಿಸಿ."],
    f_name: ["Full name", "पूरा नाम", "முழுப் பெயர்", "పూర్తి పేరు", "ಪೂರ್ಣ ಹೆಸರು"],
    f_email: ["Email", "ईमेल", "மின்னஞ்சல்", "ఇమెయిల్", "ಇಮೇಲ್"],
    f_pass: ["Password", "पासवर्ड", "கடவுச்சொல்", "పాస్‌వర్డ్", "ಪಾಸ್‌ವರ್ಡ್"],
    f_confirm: ["Confirm password", "पासवर्ड की पुष्टि करें", "கடவுச்சொல்லை உறுதிசெய்", "పాస్‌వర్డ్ నిర్ధారించండి", "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ"],
    f_show: ["Show password", "पासवर्ड दिखाएँ", "கடவுச்சொல்லைக் காட்டு", "పాస్‌వర్డ్ చూపించు", "ಪಾಸ್‌ವರ್ಡ್ ತೋರಿಸಿ"],
    f_hint: ["At least 6 characters", "कम से कम 6 अक्षर", "குறைந்தது 6 எழுத்துகள்", "కనీసం 6 అక్షరాలు", "ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು"],
    login_btn: ["Log in", "लॉग इन करें", "உள்நுழை", "లాగిన్ అవ్వండి", "ಲಾಗಿನ್ ಮಾಡಿ"],
    signup_btn: ["Create account", "खाता बनाएँ", "கணக்கை உருவாக்கு", "ఖాతా సృష్టించండి", "ಖಾತೆ ರಚಿಸಿ"],
    to_signup: ["New here?", "नए हैं?", "புதியவரா?", "కొత్తవారా?", "ಹೊಸಬರೇ?"],
    to_login: ["Already have an account?", "पहले से खाता है?", "ஏற்கனவே கணக்கு உள்ளதா?", "ఇప్పటికే ఖాతా ఉందా?", "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?"],
    err_required: ["Please fill in all fields.", "कृपया सभी फ़ील्ड भरें।", "அனைத்து புலங்களையும் நிரப்பவும்.", "దయచేసి అన్ని ఫీల్డ్‌లను నింపండి.", "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ."],
    err_email: ["Please enter a valid email address.", "कृपया मान्य ईमेल पता दर्ज करें।", "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.", "దయచేసి సరైన ఇమెయిల్ చిరునామా ఇవ్వండి.", "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ."],
    err_short: ["Password must be at least 6 characters.", "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।", "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.", "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.", "ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳಿರಬೇಕು."],
    err_match: ["Passwords do not match.", "पासवर्ड मेल नहीं खाते।", "கடவுச்சொற்கள் பொருந்தவில்லை.", "పాస్‌వర్డ్‌లు సరిపోలడం లేదు.", "ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ."],
    err_exists: ["An account with this email already exists. Please log in.", "इस ईमेल से खाता पहले से है। कृपया लॉग इन करें।", "இந்த மின்னஞ்சலில் ஏற்கனவே கணக்கு உள்ளது. உள்நுழையவும்.", "ఈ ఇమెయిల్‌తో ఖాతా ఇప్పటికే ఉంది. దయచేసి లాగిన్ అవ్వండి.", "ಈ ಇಮೇಲ್‌ನಲ್ಲಿ ಖಾತೆ ಈಗಾಗಲೇ ಇದೆ. ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ."],
    err_bad: ["Incorrect email or password.", "ईमेल या पासवर्ड गलत है।", "மின்னஞ்சல் அல்லது கடவுச்சொல் தவறானது.", "ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు.", "ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ."],
    ok_signup: ["Account created! Redirecting…", "खाता बन गया! रीडायरेक्ट हो रहा है…", "கணக்கு உருவாக்கப்பட்டது! திருப்பிவிடப்படுகிறது…", "ఖాతా సృష్టించబడింది! తరలిస్తున్నాము…", "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ! ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ…"],
    ok_login: ["Logged in! Redirecting…", "लॉग इन हो गया! रीडायरेक्ट हो रहा है…", "உள்நுழைந்தது! திருப்பிவிடப்படுகிறது…", "లాగిన్ అయింది! తరలిస్తున్నాము…", "ಲಾಗಿನ್ ಆಯಿತು! ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ…"],
    demo_note: ["Demo only: accounts are stored in this browser, not on a server.", "केवल डेमो: खाते इसी ब्राउज़र में सहेजे जाते हैं, सर्वर पर नहीं।", "டெமோ மட்டுமே: கணக்குகள் இந்த உலாவியில் சேமிக்கப்படும், சேவையகத்தில் அல்ல.", "డెమో మాత్రమే: ఖాతాలు ఈ బ్రౌజర్‌లో నిల్వ అవుతాయి, సర్వర్‌లో కాదు.", "ಡೆಮೊ ಮಾತ್ರ: ಖಾತೆಗಳು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಉಳಿಯುತ್ತವೆ, ಸರ್ವರ್‌ನಲ್ಲಿ ಅಲ್ಲ."]
  };

  Object.assign(T, {
    role_label: ["Log in as", "इस रूप में लॉग इन करें", "இவராக உள்நுழை", "ఇలా లాగిన్ అవ్వండి", "ಹೀಗೆ ಲಾಗಿನ್ ಮಾಡಿ"],
    role_user: ["User", "उपयोगकर्ता", "பயனர்", "వినియోగదారు", "ಬಳಕೆದಾರ"],
    role_admin: ["Admin", "एडमिन", "நிர்வாகி", "అడ్మిన్", "ನಿರ್ವಾಹಕ"],
    admin_login_title: ["Admin login", "एडमिन लॉग इन", "நிர்வாகி உள்நுழைவு", "అడ్మిన్ లాగిన్", "ನಿರ್ವಾಹಕ ಲಾಗಿನ್"],
    admin_demo: ["Demo admin: admin@signbridge.com / admin123", "डेमो एडमिन: admin@signbridge.com / admin123", "டெமோ நிர்வாகி: admin@signbridge.com / admin123", "డెమో అడ్మిన్: admin@signbridge.com / admin123", "ಡೆಮೊ ನಿರ್ವಾಹಕ: admin@signbridge.com / admin123"],
    err_role: ["This account is not a %s account.", "यह खाता %s खाता नहीं है।", "இந்தக் கணக்கு %s கணக்கு அல்ல.", "ఈ ఖాతా %s ఖాతా కాదు.", "ಈ ಖಾತೆ %s ಖಾತೆ ಅಲ್ಲ."],
    dashboard: ["Dashboard", "डैशबोर्ड", "டாஷ்போர்டு", "డ్యాష్‌బోర్డ్", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"],
    dash_welcome: ["Welcome", "स्वागत है", "வரவேற்கிறோம்", "స్వాగతం", "ಸ್ವಾಗತ"],
    dash_user_sub: ["Pick up where you left off. Everything here follows your chosen language.", "जहाँ छोड़ा था वहीं से शुरू करें। यहाँ सब कुछ आपकी चुनी भाषा में है।", "விட்ட இடத்திலிருந்து தொடருங்கள். இங்குள்ள அனைத்தும் நீங்கள் தேர்ந்த மொழியில் உள்ளன.", "ఆపిన చోట నుండి కొనసాగించండి. ఇక్కడ అన్నీ మీరు ఎంచుకున్న భాషలో ఉంటాయి.", "ನಿಲ್ಲಿಸಿದಲ್ಲಿಂದ ಮುಂದುವರಿಸಿ. ಇಲ್ಲಿರುವುದೆಲ್ಲ ನೀವು ಆರಿಸಿದ ಭಾಷೆಯಲ್ಲಿದೆ."],
    dash_admin_title: ["Admin Dashboard", "एडमिन डैशबोर्ड", "நிர்வாகி டாஷ்போர்டு", "అడ్మిన్ డ్యాష్‌బోర్డ్", "ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"],
    dash_admin_sub: ["Manage registered users of SignBridge.", "SignBridge के पंजीकृत उपयोगकर्ताओं का प्रबंधन करें।", "SignBridge-இன் பதிவு செய்த பயனர்களை நிர்வகிக்கவும்.", "SignBridge నమోదిత వినియోగదారులను నిర్వహించండి.", "SignBridge ನ ನೋಂದಾಯಿತ ಬಳಕೆದಾರರನ್ನು ನಿರ್ವಹಿಸಿ."],
    dash_actions: ["Quick actions", "त्वरित कार्य", "விரைவு செயல்கள்", "త్వరిత చర్యలు", "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು"],
    dash_profile: ["Your profile", "आपकी प्रोफ़ाइल", "உங்கள் சுயவிவரம்", "మీ ప్రొఫైల్", "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್"],
    dash_role: ["Role", "भूमिका", "பங்கு", "పాత్ర", "ಪಾತ್ರ"],
    dash_lang: ["Language", "भाषा", "மொழி", "భాష", "ಭಾಷೆ"],
    dash_joined: ["Joined", "जुड़ने की तिथि", "சேர்ந்த தேதி", "చేరిన తేదీ", "ಸೇರಿದ ದಿನಾಂಕ"],
    stat_users: ["Registered users", "पंजीकृत उपयोगकर्ता", "பதிவு செய்த பயனர்கள்", "నమోదైన వినియోగదారులు", "ನೋಂದಾಯಿತ ಬಳಕೆದಾರರು"],
    stat_admins: ["Admins", "एडमिन", "நிர்வாகிகள்", "అడ్మిన్లు", "ನಿರ್ವಾಹಕರು"],
    stat_lang: ["Current language", "वर्तमान भाषा", "தற்போதைய மொழி", "ప్రస్తుత భాష", "ಪ್ರಸ್ತುತ ಭಾಷೆ"],
    users_title: ["All users", "सभी उपयोगकर्ता", "அனைத்து பயனர்கள்", "అందరు వినియోగదారులు", "ಎಲ್ಲಾ ಬಳಕೆದಾರರು"],
    col_action: ["Action", "कार्रवाई", "செயல்", "చర్య", "ಕ್ರಿಯೆ"],
    delete: ["Delete", "हटाएँ", "நீக்கு", "తొలగించు", "ಅಳಿಸಿ"],
    confirm_del: ["Delete this user?", "इस उपयोगकर्ता को हटाएँ?", "இந்த பயனரை நீக்கவா?", "ఈ వినియోగదారుని తొలగించాలా?", "ಈ ಬಳಕೆದಾರರನ್ನು ಅಳಿಸಬೇಕೇ?"],
    no_users: ["No users yet.", "अभी कोई उपयोगकर्ता नहीं।", "இன்னும் பயனர்கள் இல்லை.", "ఇంకా వినియోగదారులు లేరు.", "ಇನ್ನೂ ಬಳಕೆದಾರರಿಲ್ಲ."],
    you: ["(you)", "(आप)", "(நீங்கள்)", "(మీరు)", "(ನೀವು)"],
    go_communicate: ["Communicate", "संवाद करें", "தொடர்பு கொள்ள", "సంభాషించండి", "ಸಂವಹಿಸಿ"],
    go_learn: ["Learn lessons", "पाठ सीखें", "பாடங்கள் கற்க", "పాఠాలు నేర్చుకోండి", "ಪಾಠಗಳನ್ನು ಕಲಿಯಿರಿ"],
    go_vocab: ["Vocabulary", "शब्दावली", "சொற்களஞ்சியம்", "పదజాలం", "ಶಬ್ದಕೋಶ"],
    go_quiz: ["Take the quiz", "प्रश्नोत्तरी दें", "வினாடி வினா எடு", "క్విజ్ రాయండి", "ರಸಪ್ರಶ್ನೆ ತೆಗೆದುಕೊಳ್ಳಿ"],
    not_logged: ["Please log in to see your dashboard.", "डैशबोर्ड देखने के लिए कृपया लॉग इन करें।", "டாஷ்போர்டைப் பார்க்க உள்நுழையவும்.", "డ్యాష్‌బోర్డ్ చూడటానికి దయచేసి లాగిన్ అవ్వండి.", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ."]
  });

  const INDEX_MAP = [
    [".topbar nav a[href='#home']", "nav_home"], [".topbar nav a[href='#communicate']", "nav_communicate"],
    [".topbar nav a[href='#learn']", "nav_learn"], [".topbar nav a[href='#vocabulary']", "nav_vocab"],
    [".topbar nav a[href='#quiz']", "nav_quiz"], [".topbar nav a[href='#about']", "nav_about"],
    [".topbar nav a[href='#isl-resources']", "nav_isl"], [".topbar nav a[href='#alphabet']", "nav_alpha"],
    ["#accessibilityToggle", "a11y_btn"], ["#accessibilityPanel h3", "a11y_title"], ["#accessibilityPanel > p", "a11y_desc"],
    ["#accessibilityPanel .accessibility-control:nth-of-type(1) > span", "a11y_text"],
    ["label[for='highContrastToggle']", "a11y_contrast"], ["label[for='readingModeToggle']", "a11y_reading"],
    ["#resetAccessibility", "a11y_reset"],
    [".hero .eyebrow", "hero_eyebrow"], [".hero h1", "hero_h1"], [".hero-description", "hero_desc"],
    [".hero-actions .button-primary", "hero_start"], [".hero-actions .button-light", "hero_explore"], [".small-note", "hero_note"],
    [".chip-one", "chip1"], [".chip-two", "chip2"], [".chip-three", "chip3"],
    [".card-main p", "card_hello"], [".card-main span", "card_sub"],
    ["#communicate .eyebrow", "com_eyebrow"], ["#communicate h2", "com_h2"], ["#communicate .section-heading p:last-child", "com_p"],
    ["label[for='messageInput']", "com_label"], ["#speechBtn", "com_speak"],
    [".quick-messages h3", "com_qm"], [".quick-messages > p", "com_qm_p"],
    ["#speechLanguageLabel", "com_spoken"], ["#showSigns", "com_show"], ["#speakMessage", "com_listen"], [".disclaimer", "com_disc"],
    ["#learn .eyebrow", "learn_eyebrow"], ["#learn h2", "learn_h2"], ["#learn .section-heading p:last-child", "learn_p"],
    ["#vocabulary .eyebrow", "vocab_eyebrow"], ["#vocabulary .section-heading h2", "vocab_h2"], ["#vocabulary .section-heading p:last-child", "vocab_p"],
    ["#quiz .eyebrow", "quiz_eyebrow"], ["#quiz .section-heading h2", "quiz_h2"], ["#quiz .section-heading p:last-child", "quiz_p"],
    [".bottom-banner .eyebrow", "ban_eyebrow"], [".bottom-banner h2", "ban_h2"], [".bottom-banner p:last-child", "ban_p"], [".bottom-banner .button", "ban_btn"]
  ];

  const ORDER = ["en", "hi", "ta", "te", "kn"];
  const KEY = "signbridge_lang";

  function getLang() {
    try { const l = localStorage.getItem(KEY); if (ORDER.includes(l)) return l; } catch (e) {}
    return "en";
  }
  function t(key, lang) {
    const row = T[key]; if (!row) return key;
    return row[ORDER.indexOf(lang || getLang())] || row[0];
  }

  function tagIndex() {
    INDEX_MAP.forEach(([sel, key]) => {
      document.querySelectorAll(sel).forEach((el) => { if (!el.dataset.i18n) el.dataset.i18n = key; });
    });
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const html = t(el.dataset.i18n, lang);
      if (/<[a-z]/i.test(html)) el.innerHTML = html; else el.textContent = html;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh, lang); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria, lang)); });
    document.querySelectorAll(".sb-lang-select").forEach((s) => { s.value = lang; });
    // Keep the spoken-language dropdown on the home page in sync with the site language
    const speech = document.getElementById("speechLanguage");
    if (speech) speech.value = LANGS[lang].speech;
    document.dispatchEvent(new CustomEvent("sb-language", { detail: { lang, speech: LANGS[lang].speech } }));
  }

  function setLang(lang) {
    if (!ORDER.includes(lang)) lang = "en";
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  function buildSelect() {
    const s = document.createElement("select");
    s.className = "sb-lang-select";
    s.setAttribute("aria-label", "Language");
    ORDER.forEach((c) => { const o = document.createElement("option"); o.value = c; o.textContent = LANGS[c].label; s.appendChild(o); });
    s.addEventListener("change", () => setLang(s.value));
    return s;
  }

  window.SB_I18N = { t, getLang, setLang, LANGS };

  document.addEventListener("DOMContentLoaded", () => {
    tagIndex();
    // Language dropdown goes wherever the page has a #langSlot
    const slot = document.getElementById("langSlot");
    if (slot) slot.replaceWith(buildSelect());
    // Hide the old toggle button if an old copy of 01_index.html still has it
    const old = document.getElementById("languageToggle"); if (old) old.remove();
    // Spoken-language select: add Tamil/Telugu/Kannada even if the HTML list is short
    const speech = document.getElementById("speechLanguage");
    if (speech) ORDER.forEach((c) => {
      if (![...speech.options].some((o) => o.value === LANGS[c].speech)) {
        const o = document.createElement("option"); o.value = LANGS[c].speech; o.textContent = LANGS[c].label; speech.appendChild(o);
      }
    });
    apply(getLang());
  });
})();
