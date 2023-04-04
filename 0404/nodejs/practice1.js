//스프레드 연산자

const cookie = {
    base: "cookie",
    madeIn: "korea"
};

const chocochipCookie = {
    ...cookie,
    topping: "chocochip"
};

const blueberrycookie = {
    ...cookie,
    topping: "blueberry"
};

const strawberrycookie = {
    ...cookie,
    topping:"strawberry"
};

console.log(cookie);
console.log(blueberrycookie);
console.log(chocochipCookie);
console.log(strawberrycookie);

const noToppingCookies = ["촉촉한쿠키","안촉촉한쿠키"];
const toppingCookies = ["바나쿠키","블루베리쿠키","딸기쿠키","초코쿠키"];

const allCookies = [...noToppingCookies, "함정쿠키", ...toppingCookies];

console.log(allCookies);