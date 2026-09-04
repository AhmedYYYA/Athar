/* ATHAR Lesson 1 — navigation reliability patch.
   Ensures Continue/Back always work after dynamic mastery-state changes. */
(() => {
  function advance() {
    if (typeof state === 'undefined' || typeof save !== 'function' || typeof render !== 'function') return;
    if (!Array.isArray(state.done)) state.done = [];
    if (!state.done.includes(state.stage)) state.done.push(state.stage);
    if (state.stage < 9) state.stage += 1;
    save();
    render();
  }

  function back() {
    if (typeof state === 'undefined' || typeof save !== 'function' || typeof render !== 'function') return;
    state.stage = Math.max(0, state.stage - 1);
    save();
    render();
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const action = button.dataset.action;

    // Intercept only navigation actions. Assessment actions remain handled by lesson1.js.
    if (action === 'next') {
      event.preventDefault();
      event.stopImmediatePropagation();
      advance();
    } else if (action === 'back') {
      event.preventDefault();
      event.stopImmediatePropagation();
      back();
    }
  }, true);

  // Repair stale/corrupted navigation state left by prior experimental builds.
  try {
    if (typeof state !== 'undefined') {
      state.stage = Math.min(9, Math.max(0, Number(state.stage) || 0));
      if (!Array.isArray(state.done)) state.done = [];
      state.done = [...new Set(state.done.filter((n) => Number.isInteger(n) && n >= 0 && n <= 9))];
      if (typeof save === 'function') save();
    }
  } catch (error) {
    console.error('[ATHAR] navigation state repair failed', error);
  }
})();