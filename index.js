let state = {
    inputValue: "",
    hash: location.hash,
};

function setState(newState) {
    state = { ...state, ...newState };
    render();
}

function link(props) {
    const link = document.createElement("a");
    link.href = props.href;
    link.textContent = props.label;
    link.onclick = function (event) {
        event.preventDefault();
        const url = new URL(event.target.href);
        setState({ hast: url.hash });
        history.pushState(null, "", event.target.href);
        render();
    };

    return link;
}

function Navbar() {
    const linkHome = link({
        href: "#home",
        label: "Home",
    });

    const linkAbout = link({
        href: "#about",
        label: "About",
    });

    const div = document.createElement("div");
    div.append(linkHome);
    div.append(linkAbout);

    return div;
}

function AboutScreen() {
    const linkHome = link({
        href: "#home",
        label: "Kembali ke Home",
    });

    const text = document.createElement("p");
    text.textContent = "Welcome to About";

    const div = document.createElement("div");
    div.append(linkHome);
    div.append(text);

    return div;
}

function HomeScreen() {
    const navbar = Navbar();

    const textPreview = document.createElement("p");
    textPreview.textContent = state.inputValue;

    const input = document.createElement("input");
    input.id = "input";
    input.value = state.inputValue;
    input.oninput = function (event) {
        setState({ inputValue: event.target.value });
    };
    input.placeholder = "Enter your name";

    const buttonClear = document.createElement("button");
    buttonClear.textContent = "Clear";
    buttonClear.onclick = function () {
        setState({ inputValue: "" });
    };

    const div = document.createElement("div");
    div.append(navbar);
    div.append(input);
    div.append(buttonClear);
    div.append(textPreview);

    return div;
}

function App() {
    const homeScreen = HomeScreen();
    const aboutScreen = AboutScreen();

    if (state.hash == "#about") {
        return aboutScreen;
    } else if (state.hash == "#home") {
        return homeScreen;
    }
}

function render() {
    const root = document.getElementById("root");
    const app = App();

    const focusedElementId = document.activeElement.id;
    const focusedElementSelectionStart = document.activeElement.selectionStart;
    const focusedElementSelectionEnd = document.activeElement.selectionEnd;

    root.innerHTML = "";
    root.append(app);

    if (focusedElementId) {
        const focusedElement = document.getElementById(focusedElementId);
        focusedElement.focus();
        focusedElement.selectionStart = focusedElementSelectionStart;
        focusedElement.selectionEnd = focusedElementSelectionEnd;
    }
}

render();