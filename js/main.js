/* ============================================
   QUÁN NƯỚC – main.js  (merged: app + checkout + admin)
   ============================================ */

'use strict';

/* ============================================
   SHARED CONSTANTS
   ============================================ */
const CART_KEY    = 'quanCart';
const ORDERS_KEY  = 'quanOrders';
const FALLBACK_IMG = 'https://placehold.co/400x300/fdf6ec/f77f3a?text=No+Image';

const TOPPINGS_FREE = [
  { id: 'f1',  name: 'Thạch dừa' },
  { id: 'f2',  name: 'Thạch củ năng' },
  { id: 'f3',  name: 'Thạch vải' },
  { id: 'f4',  name: 'Trân châu đen' },
  { id: 'f5',  name: 'Trân châu hoàng kim' },
  { id: 'f6',  name: 'Thạch chanh dây' },
  { id: 'f7',  name: 'Thạch dâu' },
  { id: 'f8',  name: 'Thạch trái cây' },
  { id: 'f9',  name: 'Thạch sương sáo' },
  { id: 'f10', name: 'Thạch táo' },
  { id: 'f11', name: 'Thạch trà xanh' },
  { id: 'f12', name: 'Thạch bi táo' },
  { id: 'f13', name: 'Thạch nho' },
  { id: 'f14', name: 'Thạch xoài' },
];

const TOPPINGS_PAID = [
  { id: 'p1', name: 'Pudding trứng',          price: 5000 },
  { id: 'p2', name: 'Thạch phô mai tươi sữa', price: 5000 },
  { id: 'p3', name: 'Trân châu trắng',         price: 5000 },
];

const DEFAULT_MENU = [
  // HỒNG TRÀ
  { id: 1,  cat: 'hong-tra', name: 'Hồng Trà Không',            desc: 'Hồng trà thuần túy, mát lạnh thanh tao',             prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 2,  cat: 'hong-tra', name: 'Hồng Trà Bí Đao',           desc: 'Hồng trà kết hợp bí đao mát ngọt',                   prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 3,  cat: 'hong-tra', name: 'Hồng Trà Tắc',              desc: 'Hồng trà tắc chua ngọt, giải khát',                  prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 4,  cat: 'hong-tra', name: 'Hồng Trà Tắc Mật Ong',      desc: 'Hồng trà tắc thêm mật ong thơm dịu',                 prices: { M: 15000, L: 20000 }, img: '', available: true },
  // TRÀ SỮA
  { id: 5,  cat: 'tra-sua',  name: 'Trà Sữa Truyền Thống',      desc: 'Trà sữa đậm đà, béo ngọt kiểu truyền thống',         prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 6,  cat: 'tra-sua',  name: 'Trà Sữa Thái Xanh',         desc: 'Trà xanh Thái thơm ngát, béo ngọt đặc trưng',        prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 7,  cat: 'tra-sua',  name: 'Trà Sữa Thái Đỏ',           desc: 'Trà đỏ Thái đậm màu, hương vị đặc trưng',            prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 8,  cat: 'tra-sua',  name: 'Trà Sữa Lài',               desc: 'Trà lài hoa nhài thơm, kết hợp sữa béo ngậy',        prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 9,  cat: 'tra-sua',  name: 'Sữa Tươi Trân Châu Đường Đen', desc: 'Sữa tươi béo ngậy, trân châu đường đen dẻo ngon', prices: { M: 20000, L: 30000 }, img: '', available: true },
  // ĐẶC BIỆT
  { id: 10, cat: 'tra-trai-cay', name: 'Trà Măng Cầu',              desc: 'Trà từ trái măng cầu tươi, vị ngọt thanh',           prices: { M: 25000, L: 30000 }, img: '', available: true },
  { id: 11, cat: 'tra-trai-cay', name: 'Trà Trái Cây Nhiệt Đới',    desc: 'Hỗn hợp trái cây nhiệt đới tươi mát',                prices: { M: 25000, L: 30000 }, img: '', available: true },
  { id: 12, cat: 'tra-trai-cay', name: 'Chanh Dây Tươi',            desc: 'Chanh dây tươi chua ngọt, mát lạnh',                 prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 13, cat: 'tra-trai-cay', name: 'Cam Vắt',                   desc: 'Cam vắt tươi nguyên chất, ngọt lành',                prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 14, cat: 'tra-trai-cay', name: 'Trà Vải',                   desc: 'Trà vải ngọt dịu, hương thơm đặc trưng',             prices: { M: 20000, L: 30000 }, img: '', available: true },
  { id: 15, cat: 'tra-trai-cay', name: 'Trà Đào',                   desc: 'Trà đào thơm mát, ngọt nhẹ dễ uống',                 prices: { M: 20000, L: 30000 }, img: '', available: true },
  { id: 16, cat: 'tra-trai-cay', name: 'Milo Dầm Trân Châu',        desc: 'Milo đá dầm trân châu thơm ngon hấp dẫn',            prices: { M: 20000, L: 30000 }, img: '', available: true },
  { id: 17, cat: 'tra-trai-cay', name: 'Matcha Latte',              desc: 'Matcha Nhật kết hợp sữa béo ngậy',                   prices: { M: 25000, L: 30000 }, img: '', available: true },
  // NƯỚC ÉP TRÁI CÂY (dac-biet)
  { id: 18, cat: 'tra-trai-cay', name: 'Nước Ép Dâu',               desc: 'Dâu tươi ép nguyên chất, chua ngọt',                 prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 19, cat: 'tra-trai-cay', name: 'Nước Ép Nho',               desc: 'Nho tươi ép lạnh, ngọt thanh',                       prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 20, cat: 'tra-trai-cay', name: 'Nước Ép Vải',               desc: 'Vải thiều ép thơm ngọt',                             prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 21, cat: 'tra-trai-cay', name: 'Nước Ép Kiwi',              desc: 'Kiwi tươi vắt nguyên chất, chua ngọt',               prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 22, cat: 'tra-trai-cay', name: 'Nước Ép Táo',               desc: 'Táo tươi ép lạnh, ngọt thanh mát',                   prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 23, cat: 'tra-trai-cay', name: 'Nước Ép Đào',               desc: 'Đào tươi ép mát, vị ngọt dịu',                       prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 24, cat: 'tra-trai-cay', name: 'Nước Ép Xoài',              desc: 'Xoài Cát Hòa Lộc ép tươi nguyên chất',               prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 25, cat: 'tra-trai-cay', name: 'Nước Ép Việt Quất',         desc: 'Việt quất ép tươi, giàu vitamin',                     prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 26, cat: 'tra-trai-cay', name: 'Nước Ép Bạc Hà',            desc: 'Bạc hà ép mát lạnh, thanh mùi',                      prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 27, cat: 'tra-trai-cay', name: 'Nước Ép Ổi Xá Lị',          desc: 'Ổi xá lị ép tươi, ngọt giòn',                        prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 28, cat: 'tra-trai-cay', name: 'Nước Ép Dưa Lưới',          desc: 'Dưa lưới ngọt mát, thơm nức',                        prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 29, cat: 'tra-trai-cay', name: 'Nước Ép Mật Ong',           desc: 'Trái cây hòa quyện mật ong thơm',                    prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 30, cat: 'tra-trai-cay', name: 'Nước Ép Nhiệt Đới',         desc: 'Hỗn hợp trái cây nhiệt đới ép tươi',                 prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 31, cat: 'tra-trai-cay', name: 'Nước Ép Măng Cầu',          desc: 'Măng cầu tươi ép lạnh, ngọt thơm',                   prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 32, cat: 'tra-trai-cay', name: 'Nước Ép Bao Dấm',           desc: 'Bao dấm ép tươi, vị chua ngọt đặc trưng',            prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 33, cat: 'tra-trai-cay', name: 'Nước Ép Dưa Hấu',           desc: 'Dưa hấu đỏ mọng ép lạnh, giải nhiệt',                prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 34, cat: 'tra-trai-cay', name: 'Nước Ép Me Chuối',          desc: 'Me và chuối ép chua ngọt lạ miệng',                  prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 35, cat: 'tra-trai-cay', name: 'Nước Ép Chanh Dây',         desc: 'Chanh dây ép tươi nguyên chất, chua ngọt',            prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 36, cat: 'tra-trai-cay', name: 'Nước Ép Sầu Riêng',         desc: 'Sầu riêng ép béo thơm đậm đà',                       prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 37, cat: 'tra-trai-cay', name: 'Nước Ép Phúc Bồn Tử',      desc: 'Phúc bồn tử ép tươi, ngọt chua thanh',               prices: { M: 15000, L: 20000 }, img: '', available: true },
  // LỤC TRÀ
  { id: 38, cat: 'luc-tra',  name: 'Lục Trà Lài',               desc: 'Lục trà hoa lài thơm mát, thanh nhẹ',                prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 39, cat: 'luc-tra',  name: 'Lục Trà Chanh',             desc: 'Lục trà chanh chua mát, giải khát tức thì',           prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 40, cat: 'luc-tra',  name: 'Lục Trà Chanh Mật Ong',     desc: 'Lục trà chanh hòa quyện mật ong thơm dịu',           prices: { M: 15000, L: 20000 }, img: '', available: true },
  // ĂN VẶT
  { id: 41, cat: 'an-vat',   name: 'Bánh Tráng Trộn',           desc: 'Bánh tráng khô trộn xoài, tương ớt, trứng cút',      prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 42, cat: 'an-vat',   name: 'Bánh Tráng Cuốn',           desc: 'Bánh tráng cuốn rau thơm, bơ, tương ớt',             prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 43, cat: 'an-vat',   name: 'Bánh Tráng Chấm',           desc: 'Bánh tráng giòn chấm mắm tôm hoặc tương',            prices: { M: 15000, L: 20000 }, img: '', available: true },
  { id: 44, cat: 'an-vat',   name: 'Xoài Lắc',                  desc: 'Xoài xanh lắc muối ớt cay ngọt',                     prices: { M: 20000, L: 30000 }, img: '', available: true },
  { id: 45, cat: 'an-vat',   name: 'Sa Tế Siêu Cay',            desc: 'Sa tế cay nồng, khai vị cực đỉnh',                   prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 46, cat: 'an-vat',   name: 'Dẻo Chấm',                  desc: 'Bánh dẻo chấm tương ớt ngọt',                        prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 47, cat: 'an-vat',   name: 'Muối Huyền',                desc: 'Muối huyền đặc biệt, chấm trái cây tuyệt ngon',      prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 48, cat: 'an-vat',   name: 'Xike',                      desc: 'Ăn vặt Xike cay ngọt, nghiện không thể dừng',        prices: { M: 10000, L: 15000 }, img: '', available: true },
  { id: 49, cat: 'an-vat',   name: 'Bánh Tráng Tỏi Phô Mai Cay', desc: 'Bánh tráng nướng tỏi, phô mai tan chảy, ớt cay',  prices: { M: 10000, L: 15000 }, img: '', available: true },
];

const DEFAULT_CATEGORIES = [
  { id: 1, key: 'hong-tra',    name: 'Hồng Trà',     icon: '🍵', order: 1 },
  { id: 2, key: 'tra-sua',     name: 'Trà Sữa',      icon: '🧋', order: 2 },
  { id: 3, key: 'luc-tra',     name: 'Lục Trà',      icon: '🍃', order: 3 },
  { id: 4, key: 'tra-trai-cay', name: 'Trà Trái Cây', icon: '🍹', order: 4 },
  { id: 5, key: 'soda',        name: 'Soda',         icon: '🥤', order: 5 },
  { id: 6, key: 'an-vat',      name: 'Ăn Vặt',       icon: '🌯', order: 6 },
];

/* ============================================
   SHARED UTILS
   ============================================ */
function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }

function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  if (!t.dataset.baseClass) t.dataset.baseClass = t.className || 'toast';
  const base = t.dataset.baseClass;
  t.className = base + ' show' + (type ? ' ' + type : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = base; }, 3000);
}

function getImgSrc(item) {
  if (!item.img) return FALLBACK_IMG;
  if (item.img.startsWith('data:') || item.img.startsWith('http')) return item.img;
  return `img/${item.img}`;
}

function fmtDate(iso) {
  const d  = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  return `${hh}:${mm} – ${dd}/${mo}/${d.getFullYear()}`;
}

function fmtDateShort(iso) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
}

function isToday(iso) {
  return new Date(iso).toDateString() === new Date().toDateString();
}

function isSameDate(iso, dateStr) {
  if (!dateStr) return true;
  const d = new Date(iso);
  const [y, mo, da] = dateStr.split('-').map(Number);
  return d.getFullYear() === y && (d.getMonth() + 1) === mo && d.getDate() === da;
}

function dateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================
   INDEX PAGE  (index.html)
   ============================================ */
if (document.getElementById('cartBtn')) {

  let menuCache = DEFAULT_MENU.map(m => ({ ...m }));

  function getMenu() { return menuCache; }

  function loadMenu() {
    const raw = localStorage.getItem('quanMenu');
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length) {
          menuCache = data.map(item => ({
            ...item,
            id:        +item.id,
            prices:    item.prices || (item.price ? { M: +item.price } : { M: 0 }),
            available: item.available !== false,
          }));
          return;
        }
      } catch (e) {}
    }
    menuCache = DEFAULT_MENU.map(m => ({ ...m }));
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  let currentItem = null;
  let currentQty  = 1;
  let activeCategory      = 'all';
  let selectedFreeTopping = null;
  let selectedPaidToppings = [];

  function renderMenu() {
    const grid  = document.getElementById('menuGrid');
    const menu  = getMenu();
    const items = activeCategory === 'all'
      ? menu.filter(m => m.available !== false)
      : menu.filter(m => m.cat === activeCategory && m.available !== false);

    grid.innerHTML = items.map((item, i) => `
      <div class="menu-card" data-id="${item.id}" style="animation-delay:${i * .06}s">
        <div class="card-img">
          <img
            src="${getImgSrc(item)}"
            alt="${item.name}"
            class="card-img-photo"
            loading="lazy"
            onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"
          >
          <div class="card-img-overlay"></div>
        </div>
        <div class="card-body">
          <div class="card-name">${item.name}</div>
          <div class="card-desc">${item.desc}</div>
          <div class="card-bottom">
            <span class="card-price">${item.prices ? (Object.values(item.prices).length > 1 ? 'từ ' + fmt(Math.min(...Object.values(item.prices))) : fmt(Object.values(item.prices)[0])) : fmt(item.price || 0)}</span>
            <button class="card-add" aria-label="Thêm"><i data-lucide="plus"></i></button>
          </div>
        </div>
      </div>
    `).join('');

    lucide.createIcons();

    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => openItemModal(+card.dataset.id));
    });
  }

  document.getElementById('tabs').addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.cat;
    renderMenu();
  });

  function renderToppingFree() {
    const list = document.getElementById('toppingFreeList');
    list.innerHTML = TOPPINGS_FREE.map(t => `
      <label class="topping-row">
        <span class="topping-name">${t.name}</span>
        <span class="topping-price">Miễn phí</span>
        <span class="topping-chk-wrap">
          <input type="checkbox" class="topping-native-chk" data-id="${t.id}"
            ${selectedFreeTopping === t.id ? 'checked' : ''}>
          <span class="topping-chk-custom"></span>
        </span>
      </label>
    `).join('');

    list.querySelectorAll('.topping-native-chk').forEach(inp => {
      inp.addEventListener('change', () => {
        selectedFreeTopping = inp.checked ? inp.dataset.id : null;
        renderToppingFree();
        updateModalTotal();
      });
    });
  }

  function renderToppingPaid() {
    const list       = document.getElementById('toppingPaidList');
    const maxReached = selectedPaidToppings.length >= 4;

    list.innerHTML = TOPPINGS_PAID.map(t => {
      const checked  = selectedPaidToppings.includes(t.id);
      const disabled = !checked && maxReached;
      return `
        <label class="topping-row${disabled ? ' is-disabled' : ''}">
          <span class="topping-name">${t.name}</span>
          <span class="topping-price">+${fmt(t.price)}</span>
          <span class="topping-chk-wrap">
            <input type="checkbox" class="topping-native-chk" data-id="${t.id}"
              ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
            <span class="topping-chk-custom"></span>
          </span>
        </label>
      `;
    }).join('');

    list.querySelectorAll('.topping-native-chk').forEach(inp => {
      inp.addEventListener('change', () => {
        const id = inp.dataset.id;
        if (inp.checked) {
          if (!selectedPaidToppings.includes(id)) selectedPaidToppings.push(id);
        } else {
          selectedPaidToppings = selectedPaidToppings.filter(x => x !== id);
        }
        renderToppingPaid();
        updateModalTotal();
      });
    });
  }

  function getSelectedOpt(groupId) {
    return document.querySelector(`#${groupId} .opt-btn.active`)?.dataset;
  }

  function openItemModal(id) {
    currentItem          = getMenu().find(m => m.id === id);
    currentQty           = 1;
    selectedFreeTopping  = null;
    selectedPaidToppings = [];

    const imgEl = document.getElementById('modalImg');
    imgEl.src   = getImgSrc(currentItem);
    imgEl.alt   = currentItem.name;
    imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = FALLBACK_IMG; };

    document.getElementById('modalName').textContent = currentItem.name;
    const priceVals = Object.values(currentItem.prices || { M: 0 });
    document.getElementById('modalPrice').textContent = priceVals.length > 1
      ? 'từ ' + fmt(Math.min(...priceVals))
      : fmt(priceVals[0]);
    document.getElementById('qtyVal').textContent = 1;

    // Render size buttons dynamically from item.prices
    const sizeWrap = document.getElementById('sizeOptions');
    const sizeKeys = Object.keys(currentItem.prices || { M: 0 });
    sizeWrap.innerHTML = sizeKeys.map((s, i) => {
      const p = currentItem.prices[s];
      const minP = Math.min(...Object.values(currentItem.prices));
      const extra = p - minP;
      return `<button class="opt-btn${i === 0 ? ' active' : ''}" data-val="${s}" data-extra="${extra}">${s}${extra > 0 ? ` <small>+${fmt(extra)}</small>` : ''}</button>`;
    }).join('');
    sizeWrap.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sizeWrap.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateModalTotal();
      });
    });

    ['sugarOptions', 'iceOptions'].forEach(gid => {
      document.querySelectorAll(`#${gid} .opt-btn`).forEach((btn, i) => {
        btn.classList.toggle('active', i === 0);
      });
    });

    renderToppingFree();
    renderToppingPaid();
    updateModalTotal();
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeItemModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    selectedFreeTopping  = null;
    selectedPaidToppings = [];
  }

  function calcItemPrice() {
    const sizeKey      = getSelectedOpt('sizeOptions')?.val || Object.keys(currentItem.prices || { M: 0 })[0];
    const basePrice    = (currentItem.prices || {})[sizeKey] || 0;
    const toppingExtra = selectedPaidToppings.reduce((s, id) => {
      const t = TOPPINGS_PAID.find(x => x.id === id);
      return s + (t ? t.price : 0);
    }, 0);
    return (basePrice + toppingExtra) * currentQty;
  }

  function updateModalTotal() {
    document.getElementById('modalTotalPrice').textContent = fmt(calcItemPrice());
  }

  ['sugarOptions', 'iceOptions'].forEach(gid => {
    document.getElementById(gid).addEventListener('click', e => {
      const btn = e.target.closest('.opt-btn');
      if (!btn) return;
      document.querySelectorAll(`#${gid} .opt-btn`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateModalTotal();
    });
  });

  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (currentQty > 1) { currentQty--; document.getElementById('qtyVal').textContent = currentQty; updateModalTotal(); }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    currentQty++; document.getElementById('qtyVal').textContent = currentQty; updateModalTotal();
  });

  document.getElementById('modalClose').addEventListener('click', closeItemModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeItemModal();
  });

  document.getElementById('addToCartBtn').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(12);
    const sizeData  = getSelectedOpt('sizeOptions');
    const sugarData = getSelectedOpt('sugarOptions');
    const iceData   = getSelectedOpt('iceOptions');

    const sizeKey      = sizeData?.val || Object.keys(currentItem.prices || { M: 0 })[0];
    const basePrice    = (currentItem.prices || {})[sizeKey] || 0;
    const toppingExtra = selectedPaidToppings.reduce((s, id) => {
      const t = TOPPINGS_PAID.find(x => x.id === id);
      return s + (t ? t.price : 0);
    }, 0);
    const unitPrice = basePrice + toppingExtra;

    const cartItem = {
      uid: Date.now(),
      id:  currentItem.id,
      name: currentItem.name,
      img:  currentItem.img || '',
      size:  sizeKey,
      sugar: sugarData?.val || 'Ngọt',
      ice:   iceData?.val   || 'Nhiều đá',
      toppings_free: selectedFreeTopping
        ? [TOPPINGS_FREE.find(t => t.id === selectedFreeTopping)?.name].filter(Boolean)
        : [],
      toppings_paid: selectedPaidToppings
        .map(id => TOPPINGS_PAID.find(t => t.id === id)?.name)
        .filter(Boolean),
      unitPrice,
      qty:   currentQty,
      total: unitPrice * currentQty,
    };

    cart.push(cartItem);
    updateCart();
    closeItemModal();
    showToast(`✅ Đã thêm ${currentItem.name}!`);
  });

  function updateCart() {
    saveCart();
    const badge = document.getElementById('cartBadge');
    const total = cart.reduce((s, i) => s + i.qty, 0);
    badge.textContent = total;

    renderCartItems();
    const footer = document.getElementById('cartFooter');
    footer.style.display = cart.length ? 'block' : 'none';
    document.getElementById('cartTotal').textContent = fmt(cart.reduce((s, i) => s + i.total, 0));
  }

  function renderCartItems() {
    const el = document.getElementById('cartItems');
    if (!cart.length) {
      el.innerHTML = '<p class="cart-empty">Chưa có món nào 🥺</p>';
      return;
    }
    el.innerHTML = cart.map(item => {
      const src      = getImgSrc(item);
      const toppings = [...(item.toppings_free || []), ...(item.toppings_paid || [])];
      return `
      <div class="cart-item" data-uid="${item.uid}">
        <img class="cart-item-thumb" src="${src}" alt="${item.name}"
             loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name} (${item.size})</div>
          <div class="cart-item-opts">Đường: ${item.sugar} · Đá: ${item.ice}</div>
          ${toppings.length ? `<div class="cart-item-toppings">${toppings.join(' · ')}</div>` : ''}
          <div class="cart-item-price">${fmt(item.total)}</div>
          <div class="cart-item-actions">
            <button class="cart-qty-btn" data-action="minus" data-uid="${item.uid}">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" data-action="plus" data-uid="${item.uid}">+</button>
            <button class="cart-remove" data-action="remove" data-uid="${item.uid}"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
      </div>`;
    }).join('');
    lucide.createIcons();
  }

  document.getElementById('cartItems').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const uid = +btn.dataset.uid;
    const idx = cart.findIndex(i => i.uid === uid);
    if (idx === -1) return;

    if (btn.dataset.action === 'plus') {
      cart[idx].qty++;
      cart[idx].total = cart[idx].unitPrice * cart[idx].qty;
    } else if (btn.dataset.action === 'minus') {
      cart[idx].qty--;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
      else cart[idx].total = cart[idx].unitPrice * cart[idx].qty;
    } else if (btn.dataset.action === 'remove') {
      cart.splice(idx, 1);
    }
    updateCart();
  });

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);

  function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    saveCart();
    window.location.href = 'checkout.html';
  });

  // ---- BACK TO TOP ----
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  loadMenu();
  renderMenu();
  lucide.createIcons();

} // end index page

/* ============================================
   CHECKOUT PAGE  (checkout.html)
   ============================================ */
if (document.getElementById('ckSubmit')) {

  let cart      = [];
  let orderType = 'dine-in';

  function loadCart() {
    cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!cart.length) { window.location.href = 'index.html'; return; }
    renderItems();
    updateTotals();
  }

  function renderItems() {
    document.getElementById('ckItems').innerHTML = cart.map(item => `
      <div class="ck-item">
        <img class="ck-item-thumb" src="${getImgSrc(item)}" alt="${item.name}"
             loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
        <div class="ck-item-info">
          <div class="ck-item-name">${item.name} <span class="ck-item-size">(${item.size})</span></div>
          <div class="ck-item-opts">Đường: ${item.sugar} · Đá: ${item.ice}</div>
        </div>
        <div class="ck-item-right">
          <span class="ck-item-qty">×${item.qty}</span>
          <span class="ck-item-price">${fmt(item.total)}</span>
        </div>
      </div>
    `).join('');
  }

  function updateTotals() {
    const total = cart.reduce((s, i) => s + i.total, 0);
    document.getElementById('ckSubtotal').textContent = fmt(total);
    document.getElementById('ckTotal').textContent    = fmt(total);
    document.getElementById('bankRef').textContent    = 'DH' + Date.now().toString().slice(-6);
  }

  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      orderType = btn.dataset.type;
      document.getElementById('tableGroup').style.display   = orderType === 'dine-in'  ? 'block' : 'none';
      document.getElementById('addressGroup').style.display = orderType === 'delivery' ? 'block' : 'none';
      lucide.createIcons();
    });
  });

  document.querySelectorAll('.pay-method').forEach(label => {
    label.addEventListener('click', () => {
      document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('active'));
      label.classList.add('active');
      const val = label.querySelector('input[name="pay"]').value;
      document.getElementById('bankInfo').style.display = val === 'bank' ? 'block' : 'none';
    });
  });

  document.getElementById('ckSubmit').addEventListener('click', () => {
    const name    = document.getElementById('ckName').value.trim();
    const phone   = document.getElementById('ckPhone').value.trim();
    const table   = document.getElementById('ckTable').value.trim();
    const address = document.getElementById('ckAddress').value.trim();
    const note    = document.getElementById('ckNote').value.trim();

    if (!name || !phone) {
      showToast('⚠️ Vui lòng nhập tên và số điện thoại!');
      return;
    }
    if (orderType === 'dine-in' && !table) {
      showToast('⚠️ Vui lòng nhập số bàn!');
      return;
    }
    if (orderType === 'delivery' && !address) {
      showToast('⚠️ Vui lòng nhập địa chỉ giao hàng!');
      return;
    }

    const payMethod = document.querySelector('input[name="pay"]:checked').value;
    const orderCode = 'DH' + Date.now().toString().slice(-6);

    const order = {
      order_code:       orderCode,
      status:           'pending',
      order_type:       orderType,
      table_number:     orderType === 'dine-in' ? table : '',
      customer_name:    name,
      customer_phone:   phone,
      customer_address: orderType === 'delivery' ? address : '',
      customer_note:    note,
      pay_method:       payMethod,
      items: cart.map(i => ({
        item_name: i.name,
        item_img:  i.img || '',
        size:      i.size,
        sugar:     i.sugar,
        ice:       i.ice,
        qty:       i.qty,
        total:     i.total,
      })),
      total:      cart.reduce((s, i) => s + i.total, 0),
      created_at: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    localStorage.removeItem(CART_KEY);

    document.getElementById('successId').textContent = 'Mã đơn: ' + orderCode;
    document.getElementById('successScreen').classList.add('active');
  });

  loadCart();
  lucide.createIcons();

} // end checkout page

/* ============================================
   ADMIN PAGE  (admin.html)
   ============================================ */
if (document.getElementById('adminLogin')) {

  const MENU_KEY     = 'quanMenu';
  const SETTINGS_KEY = 'quanSettings';
  const CATS_KEY     = 'quanCategories';
  const PASS_KEY     = 'quanAdminPass';
  const AUTH_KEY     = 'quanAdminAuth';

  const CAT_NAMES = {
    'hong-tra':     'Hồng Trà',
    'tra-sua':      'Trà Sữa',
    'luc-tra':      'Lục Trà',
    'tra-trai-cay': 'Trà Trái Cây',
    'soda':         'Soda',
    'an-vat':       'Ăn Vặt',
  };

  const STATUS_LABEL = {
    pending:    'Chờ xác nhận',
    processing: 'Đang làm',
    done:       'Hoàn thành',
    cancelled:  'Đã huỷ',
  };

  const SECTION_TITLES = {
    dashboard:  'Dashboard',
    orders:     'Đơn hàng',
    menu:       'Thực đơn',
    categories: 'Danh mục',
    stats:      'Thống kê',
    settings:   'Cài đặt',
  };

  let menuCache     = [];
  let ordersCache   = [];
  let settingsCache = { shopName: 'Trà Sữa Mẹ nấu', address: '', phone: '', hours: '07:00 – 22:00', isOpen: true };

  /* --- DATA --- */
  function loadMenu() {
    const raw = localStorage.getItem(MENU_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length) {
          menuCache = data.map(item => ({
            ...item,
            id:        +item.id,
            prices:    item.prices || (item.price ? { M: +item.price } : { M: 0 }),
            available: item.available !== false,
          }));
          return;
        }
      } catch (e) {}
    }
    menuCache = DEFAULT_MENU.map(m => ({ ...m }));
  }

  function saveMenu() {
    localStorage.setItem(MENU_KEY, JSON.stringify(menuCache));
  }

  function loadOrders() {
    const raw = localStorage.getItem(ORDERS_KEY);
    try {
      const data = raw ? JSON.parse(raw) : [];
      ordersCache = Array.isArray(data) ? data.map(normalizeOrder) : [];
    } catch (e) {
      ordersCache = [];
    }
  }

  function saveRawOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getRawOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function loadSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      try { Object.assign(settingsCache, JSON.parse(raw)); } catch (e) {}
    }
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsCache));
  }

  function getCategories() {
    const raw = localStorage.getItem(CATS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CATEGORIES.map(c => ({ ...c }));
  }

  function saveCategories(cats) {
    localStorage.setItem(CATS_KEY, JSON.stringify(cats));
  }

  /* --- NORMALIZERS --- */
  function normalizeOrder(o) {
    return {
      id:          o.order_code || String(o.id),
      status:      o.status || 'pending',
      orderType:   o.order_type  || 'dine-in',
      tableNumber: o.table_number || '',
      customer: {
        name:    o.customer_name    || '',
        phone:   o.customer_phone   || '',
        address: o.customer_address || '',
        note:    o.customer_note    || '',
      },
      items: (o.items || []).map(it => ({
        name:  it.item_name  || it.name  || '',
        img:   it.item_img   || it.img   || '',
        size:  it.size       || 'M',
        sugar: it.sugar      || '100%',
        ice:   it.ice        || 'Nhiều đá',
        qty:   +it.qty,
        total: +it.total,
      })),
      total:      +o.total,
      payMethod:   o.pay_method || 'cod',
      created_at:  o.created_at || new Date().toISOString(),
    };
  }

  function getMenu()     { return menuCache; }
  function getOrders()   { return ordersCache; }
  function getSettings() { return settingsCache; }

  /* --- UTILS --- */
  function updateDate() {
    const el = document.getElementById('topbarDate');
    if (!el) return;
    const d    = new Date();
    const days = ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'];
    el.textContent = `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  }

  /* --- AUTH --- */
  function checkAuth() {
    if (localStorage.getItem(AUTH_KEY) === '1') {
      showMain();
    } else {
      showLoginScreen();
    }
  }

  function showLoginScreen() {
    document.getElementById('adminWrapper').style.display = 'none';
    document.getElementById('adminLogin').style.display   = 'flex';
    const pwdEl = document.getElementById('loginPassword');
    if (pwdEl) pwdEl.value = '';
  }

  function login() {
    const pwdEl  = document.getElementById('loginPassword');
    const pwd    = pwdEl ? pwdEl.value : '';
    const stored = localStorage.getItem(PASS_KEY) || 'admin123';
    if (pwd === stored) {
      localStorage.setItem(AUTH_KEY, '1');
      showMain();
    } else {
      showToast('Mật khẩu không đúng!', 'error');
      if (pwdEl) pwdEl.select();
    }
  }

  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('loginPassword').addEventListener('keydown', e => {
    if (e.key === 'Enter') login();
  });

  document.getElementById('adminLogout').addEventListener('click', () => {
    stopPolling();
    localStorage.removeItem(AUTH_KEY);
    showLoginScreen();
  });

  /* --- SHOW MAIN --- */
  function showMain() {
    document.getElementById('adminLogin').style.display   = 'none';
    document.getElementById('adminWrapper').style.display = 'flex';
    updateDate();

    loadMenu();
    loadOrders();
    loadSettings();

    updateShopStatusBadge();
    showSection('dashboard');
    startPolling();
  }

  /* --- NAVIGATION --- */
  let activeSection = 'dashboard';

  function showSection(id) {
    const sections = ['dashboard', 'orders', 'menu', 'categories', 'stats', 'settings'];
    sections.forEach(s => {
      const el = document.getElementById('sec' + capitalize(s));
      if (el) el.style.display = s === id ? 'block' : 'none';
    });

    document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === id);
    });
    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === id);
    });

    const titleEl = document.getElementById('topbarTitle');
    if (titleEl) titleEl.textContent = SECTION_TITLES[id] || id;

    activeSection = id;

    if (id === 'dashboard')  renderDashboard();
    if (id === 'orders')     renderOrdersTable();
    if (id === 'menu')       renderMenu();
    if (id === 'categories') renderCategories();
    if (id === 'stats')      renderStats();
    if (id === 'settings')   renderSettings();

    lucide.createIcons();
    closeSidebarMobile();
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  /* --- MOBILE SIDEBAR --- */
  const hamburger      = document.getElementById('hamburger');
  const sidebar        = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    sidebarOverlay.classList.toggle('active');
  });
  sidebarOverlay.addEventListener('click', closeSidebarMobile);

  function closeSidebarMobile() {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
  }

  /* --- SHOP STATUS --- */
  function updateShopStatusBadge() {
    const el = document.getElementById('topbarShopStatus');
    if (!el) return;
    const isOpen   = settingsCache.isOpen;
    el.className   = isOpen ? 'topbar-shop-status open' : 'topbar-shop-status closed';
    el.textContent = isOpen ? '● Đang mở cửa' : '● Đóng cửa';
  }

  /* --- DASHBOARD --- */
  let chartRevenueInst = null;

  function renderDashboard() {
    const orders       = getOrders();
    const todayOrders  = orders.filter(o => isToday(o.created_at));
    const todayRevenue = todayOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((s, o) => s + o.total, 0);
    const pending = orders.filter(o => o.status === 'pending').length;
    const done    = todayOrders.filter(o => o.status === 'done').length;

    document.getElementById('dashTotalOrders').textContent = todayOrders.length;
    document.getElementById('dashRevenue').textContent     = fmt(todayRevenue);
    document.getElementById('dashPending').textContent     = pending;
    document.getElementById('dashDone').textContent        = done;

    renderRevenueChart();
    renderTopItems();
    renderRecentOrders();
    updateSidebarBadge(pending);
  }

  function renderRevenueChart() {
    const orders = getOrders();
    const labels = [];
    const data   = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toDateString();
      labels.push(fmtDateShort(d.toISOString()));
      const revenue = orders
        .filter(o => new Date(o.created_at).toDateString() === dayStr && o.status !== 'cancelled')
        .reduce((s, o) => s + o.total, 0);
      data.push(revenue);
    }

    const ctx = document.getElementById('chartRevenue');
    if (!ctx) return;
    if (chartRevenueInst) { chartRevenueInst.destroy(); chartRevenueInst = null; }

    chartRevenueInst = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Doanh thu (đ)',
          data,
          borderColor: '#f77f3a',
          backgroundColor: 'rgba(247,127,58,.12)',
          borderWidth: 2.5,
          pointBackgroundColor: '#f77f3a',
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => fmt(ctx.parsed.y) } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: v => {
                if (v >= 1000000) return (v/1000000).toFixed(1) + 'M';
                if (v >= 1000) return (v/1000).toFixed(0) + 'K';
                return v;
              },
              font: { family: 'Nunito', size: 11 },
            },
            grid: { color: 'rgba(0,0,0,.05)' },
          },
          x: {
            ticks: { font: { family: 'Nunito', size: 11 } },
            grid: { display: false },
          },
        },
      },
    });
  }

  function renderTopItems() {
    const todayOrders = getOrders().filter(o => isToday(o.created_at) && o.status !== 'cancelled');
    const counts = {};
    todayOrders.forEach(o => {
      o.items.forEach(it => { counts[it.name] = (counts[it.name] || 0) + it.qty; });
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const el     = document.getElementById('dashTopItems');
    if (!el) return;

    if (!sorted.length) {
      el.innerHTML = '<p style="font-size:13px;color:var(--a-gray);text-align:center;padding:20px 0">Chưa có dữ liệu hôm nay</p>';
      return;
    }

    const maxCount    = sorted[0][1];
    const rankClasses = ['gold', 'silver', 'bronze', '', ''];

    el.innerHTML = sorted.map(([name, count], i) => {
      const pct = maxCount ? Math.round((count / maxCount) * 100) : 0;
      return `
        <div class="top-item-row">
          <div class="top-item-rank ${rankClasses[i]}">${i + 1}</div>
          <div class="top-item-name" title="${escHtml(name)}">${escHtml(name)}</div>
          <div class="top-item-bar-wrap">
            <div class="top-item-bar-bg">
              <div class="top-item-bar-fill" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="top-item-count">${count}</div>
        </div>
      `;
    }).join('');
  }

  function renderRecentOrders() {
    const orders = getOrders().slice(0, 10);
    const tbody  = document.getElementById('dashRecentOrdersBody');
    if (!tbody) return;

    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--a-gray);padding:20px">Chưa có đơn hàng</td></tr>';
      return;
    }

    tbody.innerHTML = orders.map(o => `
      <tr class="clickable" data-id="${escHtml(o.id)}">
        <td><strong>#${escHtml(o.id)}</strong></td>
        <td>${escHtml(o.customer.name)}</td>
        <td class="col-items" style="max-width:140px">${o.items.map(i => escHtml(i.name)).join(', ')}</td>
        <td style="color:var(--orange);font-weight:800">${fmt(o.total)}</td>
        <td><span class="status-badge ${escHtml(o.status)}">${STATUS_LABEL[o.status]}</span></td>
        <td style="color:var(--a-gray);font-size:12px">${fmtDate(o.created_at)}</td>
      </tr>
    `).join('');

    tbody.querySelectorAll('tr.clickable').forEach(row => {
      row.addEventListener('click', () => openOrderDetail(row.dataset.id));
    });
  }

  /* --- ORDERS TABLE --- */
  let activeOrderStatus = 'all';
  let orderSearchQuery  = '';
  let orderDateFilter   = '';

  document.getElementById('orderStatusTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('#orderStatusTabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeOrderStatus = tab.dataset.status;
    renderOrdersTable();
  });

  document.getElementById('orderSearch').addEventListener('input', e => {
    orderSearchQuery = e.target.value.trim().toLowerCase();
    renderOrdersTable();
  });

  document.getElementById('orderDateFilter').addEventListener('change', e => {
    orderDateFilter = e.target.value;
    renderOrdersTable();
  });

  document.getElementById('refreshOrders').addEventListener('click', () => {
    loadOrders();
    renderOrdersTable();
    updateSidebarBadge();
    showToast('Đã làm mới danh sách đơn!');
  });

  function renderOrdersTable() {
    let orders = getOrders();

    if (activeOrderStatus !== 'all') {
      orders = orders.filter(o => o.status === activeOrderStatus);
    }
    if (orderDateFilter) {
      orders = orders.filter(o => isSameDate(o.created_at, orderDateFilter));
    }
    if (orderSearchQuery) {
      orders = orders.filter(o =>
        o.customer.name.toLowerCase().includes(orderSearchQuery) ||
        o.customer.phone.includes(orderSearchQuery) ||
        o.id.toLowerCase().includes(orderSearchQuery)
      );
    }

    // Mobile (≤768px): dùng card list thay cho bảng
    if (window.innerWidth <= 768) {
      renderOrdersCards(orders);
      return;
    }

    // Desktop: ẩn card list nếu có, hiện lại bảng
    const _cardsList = document.getElementById('orderCardsList');
    if (_cardsList) _cardsList.style.display = 'none';
    const _tableWrap = document.querySelector('#secOrders .table-wrap');
    if (_tableWrap) _tableWrap.style.display = '';

    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--a-gray);padding:28px">Không tìm thấy đơn hàng nào.</td></tr>';
      lucide.createIcons();
      return;
    }

    tbody.innerHTML = orders.map(o => {
      const typeLabel    = o.orderType === 'dine-in'
        ? `🪑 ${o.tableNumber || 'Tại bàn'}`
        : '🚚 Giao hàng';
      const payLabel     = o.payMethod === 'cod' ? 'Tiền mặt' : 'Chuyển khoản';
      const itemsSummary = o.items.map(i => escHtml(i.name)).join(', ');
      const actions      = getOrderActions(o.id, o.status);

      return `
        <tr>
          <td><strong style="color:var(--orange)">#${escHtml(o.id)}</strong></td>
          <td>
            <div style="font-weight:700">${escHtml(o.customer.name)}</div>
            <div style="font-size:11px;color:var(--a-gray)">${escHtml(o.customer.phone)}</div>
          </td>
          <td style="font-size:12px">${typeLabel}</td>
          <td class="col-items" style="font-size:12px" title="${itemsSummary}">${itemsSummary}</td>
          <td style="font-weight:800;color:var(--orange)">${fmt(o.total)}</td>
          <td style="font-size:12px;color:var(--a-gray)">${payLabel}</td>
          <td><span class="status-badge ${escHtml(o.status)}">${STATUS_LABEL[o.status]}</span></td>
          <td style="font-size:12px;color:var(--a-gray);white-space:nowrap">${fmtDate(o.created_at)}</td>
          <td><div class="tbl-actions">${actions}</div></td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('[data-order-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const { orderId, orderAction } = btn.dataset;
        if (orderAction === 'view')       openOrderDetail(orderId);
        else if (orderAction === 'print') printOrder(orderId);
        else                              updateOrderStatus(orderId, orderAction);
      });
    });

    lucide.createIcons();
  }

  /* --- ORDERS CARD LIST (mobile ≤768px) --- */
  function renderOrdersCards(orders) {
    const tableWrap = document.querySelector('#secOrders .table-wrap');
    if (tableWrap) tableWrap.style.display = 'none';

    let cardsList = document.getElementById('orderCardsList');
    if (!cardsList) {
      cardsList = document.createElement('div');
      cardsList.id        = 'orderCardsList';
      cardsList.className = 'order-cards-list';
      document.getElementById('secOrders').appendChild(cardsList);
    }
    cardsList.style.display = 'flex';

    if (!orders.length) {
      cardsList.innerHTML = '<p style="text-align:center;color:var(--a-gray);padding:28px 0">Không tìm thấy đơn hàng nào.</p>';
      return;
    }

    cardsList.innerHTML = orders.map(o => {
      const typeLabel = o.orderType === 'dine-in'
        ? `🪑 ${o.tableNumber ? 'Bàn ' + escHtml(o.tableNumber) : 'Tại bàn'}`
        : '🚚 Giao hàng';

      const shownItems   = o.items.slice(0, 2).map(i => escHtml(i.name));
      const remaining    = o.items.length - 2;
      const itemsSummary = shownItems.join(', ') + (remaining > 0 ? ` <span class="order-card-more">+${remaining} món</span>` : '');

      return `
        <div class="order-card">
          <div class="order-card-header">
            <span class="order-card-id">#${escHtml(o.id)}</span>
            <span class="order-card-type">${typeLabel}</span>
          </div>
          <div class="order-card-meta">${escHtml(o.customer.name)}${o.customer.phone ? ' · ' + escHtml(o.customer.phone) : ''}</div>
          <div class="order-card-items">${itemsSummary}</div>
          <div class="order-card-footer">
            <span class="order-card-total">${fmt(o.total)}</span>
            <span class="status-badge ${escHtml(o.status)}">${STATUS_LABEL[o.status]}</span>
          </div>
          <div class="order-card-actions">${getOrderActionsMobile(o.id, o.status)}</div>
        </div>
      `;
    }).join('');

    cardsList.querySelectorAll('[data-order-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const { orderId, orderAction } = btn.dataset;
        if (orderAction === 'view')       openOrderDetail(orderId);
        else if (orderAction === 'print') printOrder(orderId);
        else                              updateOrderStatus(orderId, orderAction);
      });
    });

    lucide.createIcons();
  }

  function getOrderActionsMobile(id, status) {
    const eid = escHtml(id);
    let html = `<button class="order-action-btn order-action-btn--view" data-order-action="view" data-order-id="${eid}"><i data-lucide="eye"></i> Xem</button>`;
    if (status === 'pending') {
      html += `<button class="order-action-btn order-action-btn--start" data-order-action="processing" data-order-id="${eid}"><i data-lucide="flame"></i> Bắt đầu</button>`;
    }
    if (status === 'processing') {
      html += `<button class="order-action-btn order-action-btn--done" data-order-action="done" data-order-id="${eid}"><i data-lucide="check"></i> Xong</button>`;
    }
    if (status === 'pending' || status === 'processing') {
      html += `<button class="order-action-btn order-action-btn--cancel" data-order-action="cancelled" data-order-id="${eid}"><i data-lucide="x"></i> Huỷ</button>`;
    }
    return html;
  }

  function getOrderActions(id, status) {
    const eid = escHtml(id);
    let html  = `
      <button class="tbl-btn tbl-btn--view" data-order-action="view" data-order-id="${eid}" title="Xem chi tiết">
        <i data-lucide="eye"></i>
      </button>
      <button class="tbl-btn tbl-btn--print" data-order-action="print" data-order-id="${eid}" title="In hoá đơn">
        <i data-lucide="printer"></i>
      </button>
    `;
    if (status === 'pending') {
      html += `<button class="tbl-btn tbl-btn--start" data-order-action="processing" data-order-id="${eid}"><i data-lucide="flame"></i> Bắt đầu</button>`;
    }
    if (status === 'processing') {
      html += `<button class="tbl-btn tbl-btn--done" data-order-action="done" data-order-id="${eid}"><i data-lucide="check"></i> Xong</button>`;
    }
    if (status === 'pending' || status === 'processing') {
      html += `<button class="tbl-btn tbl-btn--cancel" data-order-action="cancelled" data-order-id="${eid}"><i data-lucide="x"></i> Huỷ</button>`;
    }
    return html;
  }

  function updateOrderStatus(id, newStatus) {
    const raw = getRawOrders();
    const idx = raw.findIndex(o => (o.order_code || String(o.id)) === id);
    if (idx === -1) { showToast('Không tìm thấy đơn!', 'error'); return; }
    raw[idx].status = newStatus;
    saveRawOrders(raw);
    loadOrders();
    renderOrdersTable();
    updateSidebarBadge();
    if (activeSection === 'dashboard') renderDashboard();

    const labels = {
      processing: 'Bắt đầu làm đơn!',
      done:       'Hoàn thành đơn hàng!',
      cancelled:  'Đã huỷ đơn.',
    };
    showToast(labels[newStatus] || 'Đã cập nhật!', newStatus === 'cancelled' ? 'error' : 'success');
  }

  /* --- ORDER DETAIL MODAL --- */
  function openOrderDetail(id) {
    const order = getOrders().find(o => o.id === id);
    if (!order) return;

    document.getElementById('orderDetailTitle').textContent = `Đơn hàng #${order.id}`;

    const typeLabel = order.orderType === 'dine-in'
      ? `🪑 Tại bàn${order.tableNumber ? ' – ' + order.tableNumber : ''}`
      : '🚚 Giao hàng';
    const payLabel  = order.payMethod === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản';

    const body = document.getElementById('orderDetailBody');
    body.innerHTML = `
      <div class="order-detail-section">
        <div class="order-detail-section-title">Thông tin đơn</div>
        <div class="order-info-grid">
          <div class="order-info-row"><span>Mã đơn:</span> <strong>#${escHtml(order.id)}</strong></div>
          <div class="order-info-row"><span>Trạng thái:</span> <span class="status-badge ${escHtml(order.status)}">${STATUS_LABEL[order.status]}</span></div>
          <div class="order-info-row"><span>Loại đơn:</span> ${typeLabel}</div>
          <div class="order-info-row"><span>Thanh toán:</span> ${payLabel}</div>
          <div class="order-info-row"><span>Thời gian:</span> ${fmtDate(order.created_at)}</div>
        </div>
      </div>
      <div class="order-detail-section">
        <div class="order-detail-section-title">Khách hàng</div>
        <div class="order-info-grid">
          <div class="order-info-row"><span>Tên:</span> <strong>${escHtml(order.customer.name)}</strong></div>
          <div class="order-info-row"><span>SĐT:</span> ${escHtml(order.customer.phone)}</div>
          ${order.customer.address ? `<div class="order-info-row" style="grid-column:1/-1"><span>Địa chỉ:</span> ${escHtml(order.customer.address)}</div>` : ''}
        </div>
        ${order.customer.note ? `<div class="order-note-box">📝 ${escHtml(order.customer.note)}</div>` : ''}
      </div>
      <div class="order-detail-section">
        <div class="order-detail-section-title">Món đã đặt</div>
        <table class="order-items-table">
          <thead>
            <tr><th>Món</th><th>Cỡ</th><th>SL</th><th style="text-align:right">Thành tiền</th></tr>
          </thead>
          <tbody>
            ${order.items.map(it => `
              <tr>
                <td>${escHtml(it.name)}</td>
                <td>${escHtml(it.size)}</td>
                <td>×${it.qty}</td>
                <td style="text-align:right;font-weight:700;color:var(--orange)">${fmt(it.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="order-total-row">
          <span>Tổng cộng</span>
          <span class="price">${fmt(order.total)}</span>
        </div>
      </div>
    `;

    const footer = document.getElementById('orderDetailFooter');
    let footerHtml = `
      <button class="secondary-btn" id="orderDetailClose2"><i data-lucide="x"></i> Đóng</button>
      <button class="secondary-btn" id="orderDetailPrint"><i data-lucide="printer"></i> In hoá đơn</button>
    `;
    if (order.status === 'pending') {
      footerHtml += `<button class="primary-btn" data-order-action="processing" data-order-id="${escHtml(order.id)}"><i data-lucide="flame"></i> Bắt đầu làm</button>`;
    }
    if (order.status === 'processing') {
      footerHtml += `<button class="primary-btn" data-order-action="done" data-order-id="${escHtml(order.id)}"><i data-lucide="check"></i> Hoàn thành</button>`;
    }
    if (order.status === 'pending' || order.status === 'processing') {
      footerHtml += `<button class="danger-btn" style="width:auto" data-order-action="cancelled" data-order-id="${escHtml(order.id)}"><i data-lucide="x"></i> Huỷ đơn</button>`;
    }
    footer.innerHTML = footerHtml;

    const overlay = document.getElementById('orderDetailOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    footer.querySelectorAll('[data-order-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        updateOrderStatus(btn.dataset.orderId, btn.dataset.orderAction);
        closeOrderDetail();
      });
    });
    document.getElementById('orderDetailPrint').addEventListener('click', () => printOrder(order.id));
    const closeBtn2 = document.getElementById('orderDetailClose2');
    if (closeBtn2) closeBtn2.addEventListener('click', closeOrderDetail);

    lucide.createIcons();
  }

  function closeOrderDetail() {
    document.getElementById('orderDetailOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('orderDetailClose').addEventListener('click', closeOrderDetail);
  document.getElementById('orderDetailOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeOrderDetail();
  });

  /* --- PRINT BILL --- */
  function printOrder(id) {
    const order = getOrders().find(o => o.id === id);
    if (!order) return;
    populatePrintBill(order);
    window.print();
  }

  function populatePrintBill(order) {
    const settings = getSettings();

    const shopNameEl = document.getElementById('printShopName');
    if (shopNameEl) shopNameEl.textContent = settings.shopName;

    const shopInfoEl = document.getElementById('printShopInfo');
    if (shopInfoEl) {
      shopInfoEl.innerHTML = `
        ${escHtml(settings.address)}<br>
        ĐT: ${escHtml(settings.phone)}<br>
        Giờ: ${escHtml(settings.hours)}
      `;
    }

    const orderIdEl = document.getElementById('printOrderId');
    if (orderIdEl) orderIdEl.textContent = `Hoá đơn #${order.id}`;

    const metaEl = document.getElementById('printMeta');
    if (metaEl) {
      const typeLabel = order.orderType === 'dine-in'
        ? `Tại bàn${order.tableNumber ? ' – ' + order.tableNumber : ''}`
        : 'Giao hàng';
      metaEl.innerHTML = `
        Khách: ${escHtml(order.customer.name)}<br>
        SĐT: ${escHtml(order.customer.phone)}<br>
        ${order.customer.address ? 'Địa chỉ: ' + escHtml(order.customer.address) + '<br>' : ''}
        Loại: ${typeLabel}<br>
        Thời gian: ${fmtDate(order.created_at)}
      `;
    }

    const itemsEl = document.getElementById('printItems');
    if (itemsEl) {
      itemsEl.innerHTML = `
        <thead>
          <tr>
            <th>Món</th><th style="text-align:center">Cỡ</th><th style="text-align:center">SL</th><th style="text-align:right">T.tiền</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(it => `
            <tr>
              <td>${escHtml(it.name)}</td>
              <td style="text-align:center">${escHtml(it.size)}</td>
              <td style="text-align:center">×${it.qty}</td>
              <td style="text-align:right">${fmt(it.total)}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
    }

    const totalsEl = document.getElementById('printTotals');
    if (totalsEl) {
      const payLabel = order.payMethod === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản';
      totalsEl.innerHTML = `
        <div class="print-total-row">
          <span>Phương thức TT:</span>
          <span>${payLabel}</span>
        </div>
        <div class="print-total-row grand">
          <span>TỔNG CỘNG:</span>
          <span>${fmt(order.total)}</span>
        </div>
      `;
    }
  }

  /* --- MENU (ADMIN) --- */
  let activeMenuCat = 'all';

  document.getElementById('menuCatTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('#menuCatTabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeMenuCat = tab.dataset.cat;
    renderMenu();
  });

  document.getElementById('addItemBtn').addEventListener('click', () => openItemForm(null));

  function renderMenu() {
    let menu = getMenu();
    if (activeMenuCat !== 'all') {
      menu = menu.filter(m => m.cat === activeMenuCat);
    }

    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    if (!menu.length) {
      grid.innerHTML = '<p style="text-align:center;color:var(--a-gray);padding:40px 0;grid-column:1/-1">Không có món nào trong danh mục này.</p>';
      return;
    }

    grid.innerHTML = menu.map(item => {
      const unavailOverlay = !item.available
        ? '<div class="menu-card-admin-unavail">Tạm hết</div>'
        : '';
      const src        = getImgSrc(item);
      const imgContent = src && src !== FALLBACK_IMG
        ? `<img src="${src}" alt="${escHtml(item.name)}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />${unavailOverlay}`
        : `<span>🧋</span>${unavailOverlay}`;

      return `
        <div class="menu-card-admin">
          <div class="menu-card-admin-img">${imgContent}</div>
          <div class="menu-card-admin-body">
            <div class="menu-card-admin-cat">${escHtml(CAT_NAMES[item.cat] || item.cat)}</div>
            <div class="menu-card-admin-name">${escHtml(item.name)}</div>
            <div class="menu-card-admin-desc">${escHtml(item.desc || item.description || '')}</div>
            <div class="menu-card-admin-footer">
              <div class="menu-card-admin-price">${item.prices ? (Object.values(item.prices).length > 1 ? 'từ ' + fmt(Math.min(...Object.values(item.prices))) : fmt(Object.values(item.prices)[0])) : fmt(item.price || 0)}</div>
              <div class="menu-card-admin-actions">
                <label class="toggle-switch" title="${item.available ? 'Đang bán – click để tắt' : 'Tạm hết – click để mở'}">
                  <input type="checkbox" class="item-avail-toggle" data-id="${item.id}" ${item.available ? 'checked' : ''} />
                  <span class="toggle-slider"></span>
                </label>
                <button class="menu-card-icon-btn menu-card-icon-btn--edit" data-id="${item.id}" title="Sửa">
                  <i data-lucide="pencil"></i>
                </button>
                <button class="menu-card-icon-btn menu-card-icon-btn--delete" data-id="${item.id}" title="Xoá">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.item-avail-toggle').forEach(chk => {
      chk.addEventListener('change', () => toggleItemAvailable(+chk.dataset.id, chk.checked));
    });
    grid.querySelectorAll('.menu-card-icon-btn--edit').forEach(btn => {
      btn.addEventListener('click', () => openItemForm(+btn.dataset.id));
    });
    grid.querySelectorAll('.menu-card-icon-btn--delete').forEach(btn => {
      btn.addEventListener('click', () => deleteItem(+btn.dataset.id));
    });

    lucide.createIcons();
  }

  function toggleItemAvailable(id, state) {
    const idx = menuCache.findIndex(m => m.id === id);
    if (idx !== -1) {
      menuCache[idx].available = state;
      saveMenu();
      renderMenu();
      showToast(state ? 'Món đã bật bán!' : 'Món tạm ngưng bán.');
    }
  }

  function deleteItem(id) {
    const item = getMenu().find(m => m.id === id);
    if (!item) return;
    if (!confirm(`Xoá món "${item.name}" khỏi thực đơn?`)) return;
    menuCache = menuCache.filter(m => m.id !== id);
    saveMenu();
    renderMenu();
    showToast('Đã xoá món!');
  }

  /* --- ITEM FORM MODAL --- */
  let currentImgData = '';

  function setImgPreview(src) {
    const placeholder = document.getElementById('imgUploadPlaceholder');
    const previewWrap = document.getElementById('imgPreviewWrap');
    const preview     = document.getElementById('imgPreview');
    if (src) {
      preview.src               = src;
      placeholder.style.display = 'none';
      previewWrap.style.display = 'block';
    } else {
      preview.src               = '';
      placeholder.style.display = 'flex';
      previewWrap.style.display = 'none';
    }
  }

  function clearImgUpload() {
    currentImgData = '';
    document.getElementById('fImgFile').value = '';
    setImgPreview('');
  }

  document.getElementById('imgUploadArea').addEventListener('click', e => {
    if (e.target.closest('#imgRemove')) return;
    document.getElementById('fImgFile').click();
  });

  document.getElementById('fImgFile').addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('Ảnh quá lớn! Tối đa 5MB.', 'error');
      this.value = '';
      return;
    }
    const reader  = new FileReader();
    reader.onload = e => {
      currentImgData = e.target.result;
      setImgPreview(currentImgData);
      lucide.createIcons();
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('imgRemove').addEventListener('click', e => {
    e.stopPropagation();
    clearImgUpload();
  });

  function openItemForm(id) {
    const item = id ? getMenu().find(m => m.id === id) : null;
    document.getElementById('itemFormTitle').textContent = item ? 'Sửa món' : 'Thêm món mới';
    document.getElementById('editId').value              = item ? item.id   : '';
    document.getElementById('fEmoji').value  = '';
    document.getElementById('fName').value   = item ? item.name : '';
    document.getElementById('fDesc').value   = item ? (item.desc || item.description || '') : '';
    const prices = item ? (item.prices || (item.price ? { M: item.price } : {})) : {};
    document.getElementById('fPriceS').value = prices.S || '';
    document.getElementById('fPriceM').value = prices.M || '';
    document.getElementById('fPriceL').value = prices.L || '';
    document.getElementById('fCat').value    = item ? item.cat : 'hong-tra';
    document.getElementById('fAvailable').checked        = item ? (item.available !== false) : true;

    currentImgData = (item && item.img) ? getImgSrc(item) : '';
    setImgPreview(currentImgData);

    document.getElementById('itemFormOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('fName').focus(), 100);
  }

  function closeItemForm() {
    document.getElementById('itemFormOverlay').classList.remove('active');
    document.body.style.overflow = '';
    clearImgUpload();
  }

  document.getElementById('itemFormClose').addEventListener('click', closeItemForm);
  document.getElementById('itemFormCancel').addEventListener('click', closeItemForm);
  document.getElementById('itemFormOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeItemForm();
  });

  document.getElementById('itemFormSave').addEventListener('click', () => {
    const name      = document.getElementById('fName').value.trim();
    const desc      = document.getElementById('fDesc').value.trim();
    const priceS    = parseInt(document.getElementById('fPriceS').value, 10);
    const priceM    = parseInt(document.getElementById('fPriceM').value, 10);
    const priceL    = parseInt(document.getElementById('fPriceL').value, 10);
    const cat       = document.getElementById('fCat').value;
    const available = document.getElementById('fAvailable').checked;
    const editId    = document.getElementById('editId').value;
    const img       = currentImgData || '';

    if (!name)                { showToast('Vui lòng nhập tên món!',    'error'); return; }
    if (!desc)                { showToast('Vui lòng nhập mô tả!',      'error'); return; }
    if (!priceM || priceM < 0){ showToast('Vui lòng nhập giá M hợp lệ!', 'error'); return; }

    const prices = { M: priceM };
    if (priceS > 0) prices.S = priceS;
    if (priceL > 0) prices.L = priceL;
    // keep S before M before L order
    const orderedPrices = {};
    if (prices.S) orderedPrices.S = prices.S;
    orderedPrices.M = prices.M;
    if (prices.L) orderedPrices.L = prices.L;

    if (editId) {
      const idx = menuCache.findIndex(m => m.id === +editId);
      if (idx !== -1) {
        menuCache[idx] = { ...menuCache[idx], name, desc, prices: orderedPrices, cat, img, available };
      }
      showToast('Đã cập nhật món!', 'success');
    } else {
      const newId = menuCache.length ? Math.max(...menuCache.map(m => m.id)) + 1 : 1;
      menuCache.push({ id: newId, name, desc, prices: orderedPrices, cat, img, available });
      showToast('Đã thêm món mới!', 'success');
    }

    saveMenu();
    closeItemForm();
    renderMenu();
  });

  /* --- CATEGORIES --- */
  document.getElementById('addCatBtn').addEventListener('click', () => openCatForm(null));

  function renderCategories() {
    const cats = getCategories().sort((a, b) => a.order - b.order);
    const list = document.getElementById('catList');
    if (!list) return;

    if (!cats.length) {
      list.innerHTML = '<p style="color:var(--a-gray);text-align:center;padding:30px 0">Chưa có danh mục nào.</p>';
      return;
    }

    list.innerHTML = cats.map((cat, idx) => `
      <div class="cat-row">
        <div class="cat-row-icon">${cat.icon}</div>
        <div class="cat-row-info">
          <div class="cat-row-name">${escHtml(cat.name)}</div>
          <div class="cat-row-key"><code>${escHtml(cat.key)}</code></div>
        </div>
        <div class="cat-row-actions">
          <button class="cat-reorder-btn" data-id="${cat.id}" data-dir="up" title="Lên" ${idx === 0 ? 'disabled' : ''}>
            <i data-lucide="chevron-up"></i>
          </button>
          <button class="cat-reorder-btn" data-id="${cat.id}" data-dir="down" title="Xuống" ${idx === cats.length - 1 ? 'disabled' : ''}>
            <i data-lucide="chevron-down"></i>
          </button>
          <button class="tbl-btn tbl-btn--edit" data-id="${cat.id}"><i data-lucide="pencil"></i></button>
          <button class="tbl-btn tbl-btn--delete" data-id="${cat.id}"><i data-lucide="trash-2"></i></button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.cat-reorder-btn').forEach(btn => {
      btn.addEventListener('click', () => reorderCategory(+btn.dataset.id, btn.dataset.dir));
    });
    list.querySelectorAll('.tbl-btn--edit').forEach(btn => {
      btn.addEventListener('click', () => openCatForm(+btn.dataset.id));
    });
    list.querySelectorAll('.tbl-btn--delete').forEach(btn => {
      btn.addEventListener('click', () => deleteCat(+btn.dataset.id));
    });

    lucide.createIcons();
  }

  function reorderCategory(id, dir) {
    const cats  = getCategories().sort((a, b) => a.order - b.order);
    const idx   = cats.findIndex(c => c.id === id);
    if (idx === -1) return;
    if (dir === 'up' && idx === 0) return;
    if (dir === 'down' && idx === cats.length - 1) return;

    const swapIdx       = dir === 'up' ? idx - 1 : idx + 1;
    const tmp           = cats[idx].order;
    cats[idx].order     = cats[swapIdx].order;
    cats[swapIdx].order = tmp;

    saveCategories(cats);
    renderCategories();
  }

  function deleteCat(id) {
    const cats = getCategories();
    const cat  = cats.find(c => c.id === id);
    if (!cat) return;
    if (!confirm(`Xoá danh mục "${cat.name}"? Các món trong danh mục này sẽ không bị xoá.`)) return;
    saveCategories(cats.filter(c => c.id !== id));
    renderCategories();
    showToast('Đã xoá danh mục!');
  }

  function openCatForm(id) {
    const cats = getCategories();
    const cat  = id ? cats.find(c => c.id === id) : null;
    document.getElementById('catFormTitle').textContent = cat ? 'Sửa danh mục' : 'Thêm danh mục';
    document.getElementById('editCatId').value          = cat ? cat.id   : '';
    document.getElementById('cIcon').value              = cat ? cat.icon : '';
    document.getElementById('cName').value              = cat ? cat.name : '';
    document.getElementById('cKey').value               = cat ? cat.key  : '';
    document.getElementById('catFormOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('cName').focus(), 100);
  }

  function closeCatForm() {
    document.getElementById('catFormOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('catFormClose').addEventListener('click', closeCatForm);
  document.getElementById('catFormCancel').addEventListener('click', closeCatForm);
  document.getElementById('catFormOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCatForm();
  });

  document.getElementById('catFormSave').addEventListener('click', () => {
    const icon   = document.getElementById('cIcon').value.trim() || '📁';
    const name   = document.getElementById('cName').value.trim();
    const key    = document.getElementById('cKey').value.trim().toLowerCase().replace(/\s+/g, '-');
    const editId = document.getElementById('editCatId').value;

    if (!name) { showToast('Vui lòng nhập tên danh mục!', 'error'); return; }
    if (!key)  { showToast('Vui lòng nhập key danh mục!', 'error'); return; }

    let cats = getCategories();
    if (editId) {
      const idx = cats.findIndex(c => c.id === +editId);
      if (idx !== -1) cats[idx] = { ...cats[idx], icon, name, key };
      showToast('Đã cập nhật danh mục!', 'success');
    } else {
      const newId    = cats.length ? Math.max(...cats.map(c => c.id)) + 1 : 1;
      const maxOrder = cats.length ? Math.max(...cats.map(c => c.order)) : 0;
      cats.push({ id: newId, key, name, icon, order: maxOrder + 1 });
      showToast('Đã thêm danh mục!', 'success');
    }

    saveCategories(cats);
    closeCatForm();
    renderCategories();
  });

  /* --- STATS --- */
  let activeStatsRange   = 'today';
  let statsChartInst     = null;
  let statsCatsChartInst = null;
  let customFrom         = '';
  let customTo           = '';

  document.getElementById('statsRangeTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('#statsRangeTabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeStatsRange = tab.dataset.range;
    const customRange = document.getElementById('customDateRange');
    customRange.style.display = activeStatsRange === 'custom' ? 'flex' : 'none';
    if (activeStatsRange !== 'custom') renderStats();
  });

  document.getElementById('statsApplyDate').addEventListener('click', () => {
    customFrom = document.getElementById('statsDateFrom').value;
    customTo   = document.getElementById('statsDateTo').value;
    if (!customFrom || !customTo) { showToast('Vui lòng chọn khoảng ngày!', 'error'); return; }
    renderStats();
  });

  function getStatsDateRange() {
    const now = new Date();
    let fromDate, toDate;

    if (activeStatsRange === 'today') {
      fromDate = dateOnly(now);
      toDate   = dateOnly(now);
    } else if (activeStatsRange === '7d') {
      fromDate = dateOnly(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6));
      toDate   = dateOnly(now);
    } else if (activeStatsRange === '30d') {
      fromDate = dateOnly(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29));
      toDate   = dateOnly(now);
    } else if (activeStatsRange === 'custom' && customFrom && customTo) {
      fromDate = dateOnly(new Date(customFrom));
      toDate   = dateOnly(new Date(customTo));
    } else {
      fromDate = dateOnly(now);
      toDate   = dateOnly(now);
    }

    return { fromDate, toDate };
  }

  function renderStats() {
    const { fromDate, toDate } = getStatsDateRange();
    const allOrders = getOrders();

    const filtered = allOrders.filter(o => {
      const d = dateOnly(new Date(o.created_at));
      return d >= fromDate && d <= toDate;
    });

    const completed    = filtered.filter(o => o.status !== 'cancelled');
    const cancelled    = filtered.filter(o => o.status === 'cancelled');
    const totalRevenue = completed.reduce((s, o) => s + o.total, 0);
    const avgOrder     = completed.length ? Math.round(totalRevenue / completed.length) : 0;
    const cancelRate   = filtered.length  ? Math.round((cancelled.length / filtered.length) * 100) : 0;

    document.getElementById('statsTotalRevenue').textContent = fmt(totalRevenue);
    document.getElementById('statsTotalOrders').textContent  = filtered.length;
    document.getElementById('statsAvgOrder').textContent     = fmt(avgOrder);
    document.getElementById('statsCancelRate').textContent   = cancelRate + '%';

    renderStatsChart(fromDate, toDate, allOrders);
    renderCatsChart(completed);
    renderStatsItemsTable(completed);
  }

  function renderStatsChart(fromDate, toDate, allOrders) {
    const labels = [];
    const data   = [];
    const cursor = new Date(fromDate);

    while (cursor <= toDate) {
      const dayStr = cursor.toDateString();
      labels.push(fmtDateShort(cursor.toISOString()));
      const revenue = allOrders
        .filter(o => new Date(o.created_at).toDateString() === dayStr && o.status !== 'cancelled')
        .reduce((s, o) => s + o.total, 0);
      data.push(revenue);
      cursor.setDate(cursor.getDate() + 1);
    }

    const ctx = document.getElementById('chartStats');
    if (!ctx) return;
    if (statsChartInst) { statsChartInst.destroy(); statsChartInst = null; }

    statsChartInst = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Doanh thu (đ)',
          data,
          borderColor: '#f77f3a',
          backgroundColor: 'rgba(247,127,58,.10)',
          borderWidth: 2.5,
          pointBackgroundColor: '#f77f3a',
          pointRadius: labels.length <= 10 ? 4 : 2,
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => fmt(c.parsed.y) } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: v => {
                if (v >= 1000000) return (v/1000000).toFixed(1) + 'M';
                if (v >= 1000) return (v/1000).toFixed(0) + 'K';
                return v;
              },
              font: { family: 'Nunito', size: 11 },
            },
            grid: { color: 'rgba(0,0,0,.05)' },
          },
          x: {
            ticks: { font: { family: 'Nunito', size: 11 }, maxTicksLimit: 14 },
            grid: { display: false },
          },
        },
      },
    });
  }

  function renderCatsChart(completedOrders) {
    const catRevenue = {};
    completedOrders.forEach(o => {
      o.items.forEach(it => {
        const menuItem = getMenu().find(m => m.name === it.name);
        const cat      = menuItem ? menuItem.cat : 'khac';
        catRevenue[cat] = (catRevenue[cat] || 0) + it.total;
      });
    });

    const catKeys = Object.keys(catRevenue);
    const labels  = catKeys.map(k => CAT_NAMES[k] || k);
    const values  = catKeys.map(k => catRevenue[k]);
    const colors  = ['#f77f3a','#4caf7d','#2979ff','#ffa15a','#ab47bc','#ef5350','#26a69a'];

    const ctx = document.getElementById('chartCats');
    if (!ctx) return;
    if (statsCatsChartInst) { statsCatsChartInst.destroy(); statsCatsChartInst = null; }

    if (!values.length) {
      ctx.parentElement.innerHTML = '<p style="text-align:center;color:var(--a-gray);padding:40px 0">Không có dữ liệu</p>';
      return;
    }

    statsCatsChartInst = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data:            values,
          backgroundColor: colors.slice(0, values.length),
          borderWidth:     2,
          borderColor:     '#fff',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels:   { font: { family: 'Nunito', size: 12 }, padding: 14 },
          },
          tooltip: { callbacks: { label: c => `${c.label}: ${fmt(c.parsed)}` } },
        },
      },
    });
  }

  function renderStatsItemsTable(completedOrders) {
    const itemMap = {};
    completedOrders.forEach(o => {
      o.items.forEach(it => {
        if (!itemMap[it.name]) {
          itemMap[it.name] = { name: it.name, qty: 0, revenue: 0 };
          const menuItem = getMenu().find(m => m.name === it.name);
          if (menuItem) itemMap[it.name].cat = CAT_NAMES[menuItem.cat] || menuItem.cat;
        }
        itemMap[it.name].qty     += it.qty;
        itemMap[it.name].revenue += it.total;
      });
    });

    const sorted = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue);
    const tbody  = document.getElementById('statsItemsBody');
    if (!tbody) return;

    if (!sorted.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--a-gray);padding:20px">Không có dữ liệu</td></tr>';
      return;
    }

    tbody.innerHTML = sorted.map((item, i) => `
      <tr>
        <td style="color:var(--a-gray);font-weight:800">${i + 1}</td>
        <td><strong>${escHtml(item.name)}</strong></td>
        <td style="color:var(--a-gray);font-size:12px">${escHtml(item.cat || '—')}</td>
        <td style="font-weight:700">${item.qty}</td>
        <td style="font-weight:800;color:var(--orange)">${fmt(item.revenue)}</td>
      </tr>
    `).join('');
  }

  /* --- SETTINGS --- */
  function renderSettings() {
    const s  = getSettings();
    const el = id => document.getElementById(id);
    if (el('setShopName'))    el('setShopName').value    = s.shopName || '';
    if (el('setShopAddress')) el('setShopAddress').value = s.address  || '';
    if (el('setShopPhone'))   el('setShopPhone').value   = s.phone    || '';
    if (el('setShopHours'))   el('setShopHours').value   = s.hours    || '';
    if (el('setIsOpen'))      el('setIsOpen').checked    = s.isOpen;
    updateShopStatusText(s.isOpen);
  }

  function updateShopStatusText(isOpen) {
    const el = document.getElementById('shopStatusText');
    if (el) el.textContent = isOpen
      ? 'Quán đang mở và nhận đơn hàng'
      : 'Quán đang đóng cửa, không nhận đơn';
  }

  document.getElementById('setIsOpen').addEventListener('change', function() {
    settingsCache.isOpen = this.checked;
    saveSettings();
    updateShopStatusText(this.checked);
    updateShopStatusBadge();
    showToast(this.checked ? 'Quán đã mở cửa!' : 'Quán đã đóng cửa!', this.checked ? 'success' : '');
  });

  document.getElementById('saveShopInfo').addEventListener('click', () => {
    settingsCache.shopName = document.getElementById('setShopName').value.trim();
    settingsCache.address  = document.getElementById('setShopAddress').value.trim();
    settingsCache.phone    = document.getElementById('setShopPhone').value.trim();
    settingsCache.hours    = document.getElementById('setShopHours').value.trim();
    saveSettings();
    updateShopStatusBadge();
    showToast('Đã lưu thông tin quán!', 'success');
  });

  document.getElementById('savePassword').addEventListener('click', () => {
    const oldPwd = document.getElementById('oldPassword').value;
    const newPwd = document.getElementById('newPassword').value.trim();
    const stored = localStorage.getItem(PASS_KEY) || 'admin123';

    if (oldPwd !== stored)  { showToast('Mật khẩu hiện tại không đúng!', 'error'); return; }
    if (newPwd.length < 4)  { showToast('Mật khẩu mới phải có ít nhất 4 ký tự!', 'error'); return; }

    localStorage.setItem(PASS_KEY, newPwd);
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    showToast('Đã đổi mật khẩu!', 'success');
  });

  document.getElementById('exportData').addEventListener('click', () => {
    const data = {
      menu:        menuCache,
      orders:      ordersCache,
      settings:    settingsCache,
      categories:  getCategories(),
      exported_at: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `quan-nuoc-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất dữ liệu!', 'success');
  });

  document.getElementById('resetOrders').addEventListener('click', () => {
    if (!confirm('Xoá tất cả đơn hàng? Không thể hoàn tác!')) return;
    localStorage.removeItem(ORDERS_KEY);
    loadOrders();
    renderOrdersTable();
    if (activeSection === 'dashboard') renderDashboard();
    updateSidebarBadge();
    showToast('Đã xoá tất cả đơn hàng!');
  });

  document.getElementById('resetMenu').addEventListener('click', () => {
    if (!confirm('Reset thực đơn về mặc định? Các món bạn thêm sẽ bị xoá!')) return;
    localStorage.removeItem(MENU_KEY);
    loadMenu();
    renderMenu();
    showToast('Đã reset thực đơn về mặc định!');
  });

  /* --- POLLING --- */
  let pollingInterval = null;
  let lastOrderIds    = [];

  function startPolling() {
    lastOrderIds = ordersCache.map(o => o.id);
    updateSidebarBadge();

    pollingInterval = setInterval(() => {
      loadOrders();
      const currentIds = ordersCache.map(o => o.id);
      const newIds     = currentIds.filter(id => !lastOrderIds.includes(id));

      if (newIds.length) {
        beep();
        showToast(`Có ${newIds.length} đơn hàng mới!`, 'success');
        if (activeSection === 'orders')    renderOrdersTable();
        if (activeSection === 'dashboard') renderDashboard();
      }

      lastOrderIds = currentIds;
      updateSidebarBadge();
      if (activeSection === 'dashboard') renderDashboard();
    }, 5000);
  }

  function stopPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  }

  function updateSidebarBadge(count) {
    if (count === undefined) {
      count = ordersCache.filter(o => o.status === 'pending').length;
    }
    const badge = document.getElementById('sidebarOrderBadge');
    if (badge) {
      badge.textContent   = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
    const bottomBadge = document.getElementById('bottomOrderBadge');
    if (bottomBadge) {
      bottomBadge.textContent   = count;
      bottomBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function beep() {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
      osc.onended = () => ctx.close();
    } catch (e) {}
  }

  /* --- INIT --- */
  checkAuth();
  updateDate();
  lucide.createIcons();

} // end admin page
