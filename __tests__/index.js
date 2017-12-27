var estorge = require("../dist/index.js")
// fetch("http://www.baidu.com").then(function(response) {
//   return response.json();
// }).then(function(data) {
//   console.log(data);
// }).catch(function(e) {
//   console.log("Oops, error");
// });
beforeAll(() => {
  estorge.localStorage.level = 1;
  estorge.sessionStorage.level = 1;
});

test("on事件", () => {
	estorge.on("a1",(key,value)=>{
		expect(value).toBe('abc')
	})
	estorge.on("a2",(key,value)=>{
		expect(value).toBe('ccc')
	})
})
test("读写localStorage", () => {
	estorge.localStorage.setItem("a1", "abc");
	expect(estorge.localStorage.getItem("a1")).toBe('abc')
})
test("读写sessionStorage", () => {
	estorge.sessionStorage.setItem("a2", "ccc");
	expect(estorge.sessionStorage.getItem("a2")).toBe('ccc')
})
test("不在localStorage降级到sessionStorage", () => {
	expect(estorge.localStorage.getItem("a2")).toBe("ccc")
})
test("不在sessionStorage", () => {
	expect(estorge.sessionStorage.getItem("a1")).toBeNull()
})
test("localStorage没有降级", () => {
	expect(estorge.localStorage.level).toBe(1)
})
test("sessionStorage没有降级", () => {
	expect(estorge.sessionStorage.level).toBe(1)
})
// test('the data is peanut butter', () => {
//   expect.assertions(1);
//   return fetchData().then(data => {
//     expect(data).toBe('peanut butter');
//   });
// });
// test('the data is uyun', async () => {
//     const data = await fetchData();
//     expect(data).toBe('uyun');
// });