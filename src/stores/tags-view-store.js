import { defineStore } from 'pinia';
import { generateTitle } from '@/utils/i18n';

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [],
    cachedViews: []
  }),
  actions: {
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: generateTitle(view?.meta?.title) || 'no-name'
        })
      )
    },
    addCachedView(view) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },

    async delView(view) {
      await this.delVisitedView(view)
      await this.delCachedView(view)
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      }
    },
    async delVisitedView(view) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
      return [...this.visitedViews]
    },
    async delCachedView(view) {
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
      return [...this.cachedViews]
    },

    async delOthersViews(view) {
      await this.delOthersVisitedViews(view)
      await this.delOthersCachedViews(view)
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      }
    },
    async delOthersVisitedViews(view) {
      this.visitedViews = this.visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path
      })
      return [...this.visitedViews]
    },
    async delOthersCachedViews(view) {
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
      return [...this.cachedViews]
    },

    async delAllViews(view) {
      this.delAllVisitedViews(view)
      this.delAllCachedViews(view)
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      }
    },
    async delAllVisitedViews() {
      // keep affix tags
      const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
      this.visitedViews = affixTags
      return [...this.visitedViews]
    },
    async delAllCachedViews() {
      this.cachedViews = []
      return [...this.cachedViews]
    },

    updateVisitedView(view) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
});
