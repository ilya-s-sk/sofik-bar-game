import { defineStore } from "pinia";
import { VNode } from "vue";

interface IState {
  isShow: boolean,
  content: string | VNode | null
  isErrorShow: boolean,
  errorContent: string,
}

export const useDialogStore = defineStore('dialog', {
  state: (): IState => ({
    isShow: false,
    content: null,
    isErrorShow: false,
    errorContent: '',
  }),
  actions: {
    showDialog(content: IState['content']) {
      this.isShow = true;
      this.content = content;
    },
    showErrorDialog(error: unknown) {
      this.isShow = true;
      this.isErrorShow = true;
      this.errorContent = JSON.stringify(error);
    },
    closeDialog() {
      this.$reset();
    }
  }
})