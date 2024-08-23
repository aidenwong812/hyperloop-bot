// @ts-nocheck

const store = {
  users: {},
  wallets: {},
  referrers: {},
  numberOfReferrals: {},
  lifeTimeIncomes: {},
  intervalID: {
    start: null,
    managePositions: null,
    token: null,
    autoSell: null,
  },
  setting: {},

  getUser(id: number) {
    return this.users[id] || null;
  },

  setUser(user: any) {
    const { id } = user;
    this.users[id] = user;
  },

  getWallet(id: number) {
    return this.wallets[id] || null;
  },

  setWallet(wallet: any) {
    const { id } = wallet;
    this.wallets[id] = wallet;
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

  getIntervalID() {
    return (
      this.intervalID || {
        start: null,
        managePositions: null,
        token: null,
        autoSell: null,
      }
    );
  },

  setIntervalID(id: any) {
    this.intervalID = id;
  },

  clearAllInterval() {
    if (this.intervalID?.start) {
      clearInterval(this.intervalID.start);
    }
    if (this.intervalID?.managePositions) {
      clearInterval(this.intervalID.managePositions);
    }
    if (this.intervalID?.token) {
      clearInterval(this.intervalID.token);
    }

    this.intervalID = {
      start: null,
      managePositions: null,
      token: null,
      autoSell: this.intervalID.autoSell,
    };
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
