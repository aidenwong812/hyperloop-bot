// @ts-nocheck

const store = {
  users: {},
  transactions: {},
  referrers: {},
  numberOfReferrals: {},
  setting: {},

  getUser(id: number) {
    return this.users[id] || null;
  },

  setUser(user: any) {
    const { id } = user;
    this.users[id] = user;
  },

  getTransaction(transactionId: string) {
    return this.transactions[transactionId] || null;
  },

  setTransaction(transaction: any) {
    const { transactionId } = transaction;
    this.transactions[transactionId] = transaction;
  },

  getReferrer(id: string) {
    return this.referrers[id.toString()] || null;
  },

  setReferrer(user: any) {
    const { id, referrerId } = user;
    if (referrerId) {
      this.referrers[referrerId.toString()] = id;
    }
  },

  getSetting(id: number) {
    return this.setting[id] || null;
  },

  setSetting(id: number, setting: any) {
    const oldSetting = this.setting[id];
    this.setting[id] = { ...oldSetting, ...setting };
  },

  clearSetting(id: number) {
    this.setting[id] = {};
  },
};

export default store;
