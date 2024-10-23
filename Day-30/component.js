class F8 {
  static component(name, option) {
    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          if (option.data) {
            this.data = option.data();
          }
          if (option.template) {
            const template = option.template;
            const variables = [];

            // Tách chuỗi thành các phần dựa trên {{ và }}
            const parts = template.split(/{{|}}/).map((part) => part.trim());

            // Lưu các biến vào mảng
            for (let i = 1; i < parts.length; i += 2) {
              variables.push(parts[i]);
            }
            // Thay thế các biến trong template bằng giá trị tương ứng
            let replaceTemplate = template;
            variables.forEach((key) => {
              replaceTemplate = replaceTemplate.replace(
                `{{${key}}}`,
                this.data[key] !== undefined ? this.data[key] : ""
              );
            });

            const templateEle = document.createElement("template");
            templateEle.innerHTML = replaceTemplate;

            const templateNode = templateEle.content.cloneNode(true);
            const btn = templateNode.querySelectorAll("button");
            const number = templateNode.querySelector(".count");
            btn.forEach((btn) => {
              const nameAttribute = btn.getAttributeNames();
              const nameEvent = nameAttribute[0].split("v-on:");
              const btnEvent = nameEvent[1];
              const btnAttribute = btn.getAttribute(`v-on:${btnEvent}`);
              btn.addEventListener(btnEvent, () => {
                if (btnAttribute === "count--") {
                  number.innerText = ` ${--this.data.count} `;
                }
                if (btnAttribute === "count++") {
                  number.innerText = `  ${++this.data.count} `;
                }
              });
            });
            this.append(templateNode);
          }
        }
      }
    );
  }
}
