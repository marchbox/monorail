export default class Ben {
  constructor() {
    this.#handleNavigateEvent();
  }

  #handleNavigateEvent() {
    navigation.addEventListener('navigate', evt => {
      if (!evt.canIntercept || evt.hashChange ||
          evt.downloadRequest !== null || evt.formData !== null ||
          evt.destination.sameDocument) {
        if (evt.destination.sameDocument) {
          evt.preventDefault();
        }
        return;
      }

      evt.intercept({
        handler: async () => {
          try {
            const page = await this.#fetchPage(evt.destination.url);
            this.#renderPage(page);
          } catch (err) {
            throw err;
          }
        },
      });
    });
  }

  async #fetchPage(url) {
    const res = await fetch(url, {
      method: 'get',
    });

    if (res.ok) {
      const html = await res.text();
      return new DOMParser().parseFromString(html, 'text/html');
    }

    return null;
  }

  #renderPage(doc) {
    if (!doc) {
      return;
    }

    document.title = doc.title;

    const {head, body} = doc;

    head.querySelectorAll('meta').forEach(el => {
      const name = el.name;

      if (['viewport'].includes(name) || !name) {
        return;
      }

      const current = document.querySelector(`meta[name="${name}"]`);

      if (current) {
        document.head.replaceChild(el, current);
      } else {
        document.head.append(el);
      }
    });

    document.body.replaceChild(
      body.querySelector('main'),
      document.querySelector('main')
    );
  }
}

