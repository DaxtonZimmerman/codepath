import { beforeAll, describe, expect, it, vi } from "vitest";
import { PRODUCT_EXAMPLE } from "../lib/studio-content";
import { SUITES } from "../lib/studio-checks";

// Trusted authored fixture only. Never evaluate user-provided projects in Node.
const messages: any[] = [];
const scope = { postMessage: (m: unknown) => messages.push(m), setTimeout, onmessage: (_: any) => {} };
beforeAll(async () => {
  vi.stubGlobal("self", scope);
  await import("./worker");
});
function request(data: object) {
  messages.length = 0;
  scope.onmessage({ data: { id: 1, ...data } });
  const reply = messages.find((m) => m.type === "reply");
  expect(reply?.error).toBeUndefined();
  return reply.result;
}
describe("authored Product Filter reference", () => {
  for (const suite of SUITES) it(`passes the actual Studio suite: ${suite.id}`, () => {
    let result = request({ type: "init", files: PRODUCT_EXAMPLE });
    for (const step of suite.steps) result = request({ type: "event", selector: step.sel, event: step.ev, value: step.value });
    const ids = result.cards.map((c: any) => Number(c.id));
    expect(suite.ordered ? ids : ids.sort((a: number, b: number) => a - b)).toEqual(suite.ordered ? suite.ids : [...suite.ids].sort((a, b) => a - b));
    expect(result.empty).toBe(suite.empty);
  });
  it("defaults to all products like a browser select", () => {
    const result = request({ type: "init", files: PRODUCT_EXAMPLE });
    expect(result.cards).toHaveLength(6);
    expect(result.empty).toBe(false);
  });
  it("combines category and sorting", () => {
    request({ type: "init", files: PRODUCT_EXAMPLE });
    request({ type: "event", selector: "#category", event: "change", value: "bottoms" });
    const result = request({ type: "event", selector: "#sort", event: "change", value: "desc" });
    expect(result.cards.map((c: any) => c.id)).toEqual(["3", "4"]);
  });
  it("normalizes search and restores empty results", () => {
    request({ type: "init", files: PRODUCT_EXAMPLE });
    expect(request({ type: "event", selector: "#search", event: "input", value: "  LINEN  " }).cards.map((c: any) => c.id)).toEqual(["1"]);
    expect(request({ type: "event", selector: "#search", event: "input", value: "zzzz" }).empty).toBe(true);
    expect(request({ type: "event", selector: "#search", event: "input", value: "" }).cards).toHaveLength(6);
  });
});

// Both implementations below are trusted test fixtures authored for this check.
it("rejects mutation even when the returned value matches", () => {
  const tests = [{ args: [["html"], "css"], expected: ["html", "css"], label: "preserve input", preserveArgs: true }];
  const bad = request({ type: "challenge", functionName: "addTag", code: "function addTag(tags, tag) { tags.push(tag); return tags; }", tests: structuredClone(tests) });
  expect(bad[0].passed).toBe(false);
  const good = request({ type: "challenge", functionName: "addTag", code: "function addTag(tags, tag) { return [...tags, tag]; }", tests: structuredClone(tests) });
  expect(good[0].passed).toBe(true);
});

it("runs reading experiments through the worker with bounded console output", () => {
  expect(request({type:"experiment",code:'console.log("hello", 3); console.warn({done:true});'})).toEqual(['hello 3','{"done":true}']);
  expect(request({type:"experiment",code:'for(let i=0;i<200;i++) console.log(i);'})).toHaveLength(100);
  messages.length=0;
  scope.onmessage({data:{id:1,type:"experiment",code:'throw new Error("example failed");'}});
  expect(messages.find(m=>m.type==='reply').error).toBe('example failed');
});

// Trusted authored fixtures validate the actual workshop-to-app adapter in the isolated runtime.
import { workshopAppFiles } from '../lib/workshop-project';
it('connects checked checkout rules to a working price-calculator form',()=>{
 const source='function checkout(p,q,m){if(!Number.isInteger(p)||p<0||!Number.isInteger(q)||q<0||typeof m!=="boolean")return "Invalid input";const t=p*q;return "$"+((m&&t>=5000?Math.round(t*.9):t)/100).toFixed(2);}';
 request({type:'init',files:workshopAppFiles('js',source)});
 request({type:'event',selector:'#checkout-form',event:'submit'});expect(messages.find(m=>m.type==='render').html).toContain('$50.00');
 request({type:'event',selector:'#member',event:'change',value:'on',checked:true});request({type:'event',selector:'#checkout-form',event:'submit'});expect(messages.find(m=>m.type==='render').html).toContain('$45.00');
 request({type:'event',selector:'#quantity',event:'input',value:'1.5'});request({type:'event',selector:'#checkout-form',event:'submit'});expect(messages.find(m=>m.type==='render').html).toContain('Invalid input');
 request({type:'event',selector:'#price',event:'input',value:''});request({type:'event',selector:'#checkout-form',event:'submit'});expect(messages.find(m=>m.type==='render').html).toContain('Enter a price and quantity.');
});
it('connects the learner catalog pipeline to search, category, sorting and empty states',()=>{
 const source='function catalog(products,q,c){return products.filter(p=>p.name.toLowerCase().includes(q.trim().toLowerCase())&&(c==="all"||p.category===c)).sort((a,b)=>a.price-b.price);}';
 let result=request({type:'init',files:workshopAppFiles('data',source)});expect(result.cards.map((c:any)=>c.id)).toEqual(['2','4','1','3','5','6']);
 request({type:'event',selector:'#category',event:'change',value:'tops'});result=request({type:'event',selector:'#sort',event:'change',value:'desc'});expect(result.cards.map((c:any)=>c.id)).toEqual(['1','2']);
 result=request({type:'event',selector:'#search',event:'input',value:'  LINEN  '});expect(result.cards.map((c:any)=>c.id)).toEqual(['1']);
 result=request({type:'event',selector:'#search',event:'input',value:'zzzz'});expect(result.cards).toHaveLength(0);expect(result.empty).toBe(true);
});
it('activates a submit button once and respects a cancelled click',()=>{
 const files={'index.html':'<html><body><form><button id="save">Save</button></form><p id="count">0</p></body></html>','styles.css':'','script.js':'let count=0;document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();document.querySelector("#count").textContent=String(++count);});'};
 request({type:'init',files});request({type:'event',selector:'#save',event:'activate'});expect(messages.find(m=>m.type==='render').html).toContain('>1</p>');
 request({type:'init',files:{...files,'script.js':files['script.js']+'document.querySelector("#save").addEventListener("click",e=>e.preventDefault());'}});request({type:'event',selector:'#save',event:'activate'});expect(messages.find(m=>m.type==='render').html).toContain('>0</p>');
});
it('serializes checked state and preserves initial checkboxes',()=>{
 const files={'index.html':'<html><body><input id="member" type="checkbox" checked></body></html>','styles.css':'','script.js':''};
 request({type:'init',files});expect(messages.find(m=>m.type==='render').html).toMatch(/<input[^>]*checked/);
 request({type:'event',selector:'#member',event:'change',value:'on',checked:false});expect(messages.find(m=>m.type==='render').html).not.toMatch(/<input[^>]*checked/);
 request({type:'event',selector:'#member',event:'change',value:'on',checked:true});expect(messages.find(m=>m.type==='render').html).toMatch(/<input[^>]*checked/);
});
it('keeps a named radio group mutually exclusive in the virtual document',()=>{
 const files={'index.html':'<html><body><form><input id="a" name="pick" type="radio" checked><input id="b" name="pick" type="radio"></form></body></html>','styles.css':'','script.js':''};request({type:'init',files});request({type:'event',selector:'#b',event:'change',value:'b',checked:true});const html=messages.find(m=>m.type==='render').html;expect((html.match(/checked/g)||[])).toHaveLength(1);expect(html).toMatch(/<input[^>]*(?:id="b"[^>]*checked|checked[^>]*id="b")/);
});
