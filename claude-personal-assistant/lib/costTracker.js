const fs = require('fs');
const path = require('path');

class CostTracker {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/costs.json');
    this.currentRun = {
      startTime: Date.now(),
      operations: []
    };

    this.rates = {
      whisper: 0.006 / 60, // per second
      claude_input: 3.00 / 1000000, // per token
      claude_output: 15.00 / 1000000,
      vision: 3.00 / 1000 // per image
    };
  }

  logUsage(service, data) {
    let cost = 0;

    switch(service) {
      case 'whisper':
        cost = (data / 1000) * this.rates.whisper; // data is file size
        break;
      case 'claude':
        cost = (data.input_tokens * this.rates.claude_input) +
               (data.output_tokens * this.rates.claude_output);
        break;
      case 'vision':
        cost = data * this.rates.vision; // data is image count
        break;
    }

    this.currentRun.operations.push({
      service,
      cost: cost.toFixed(4),
      timestamp: Date.now()
    });

    console.log(`💰 ${service}: $${cost.toFixed(4)}`);

    return cost;
  }

  getLastRunCost() {
    const total = this.currentRun.operations.reduce(
      (sum, op) => sum + parseFloat(op.cost),
      0
    );
    return total.toFixed(4);
  }

  getStats() {
    return {
      lastRun: this.getLastRunCost(),
      todayTotal: this.getTodayTotal(),
      monthTotal: this.getMonthTotal()
    };
  }

  getDetailedStats() {
    return {
      currentRun: this.currentRun,
      stats: this.getStats(),
      rates: this.rates
    };
  }

  getTodayTotal() {
    const today = new Date().toISOString().split('T')[0];
    const todayOps = this.currentRun.operations.filter(op => {
      const opDate = new Date(op.timestamp).toISOString().split('T')[0];
      return opDate === today;
    });

    const total = todayOps.reduce((sum, op) => sum + parseFloat(op.cost), 0);
    return total.toFixed(4);
  }

  getMonthTotal() {
    const month = new Date().toISOString().slice(0, 7);
    const monthOps = this.currentRun.operations.filter(op => {
      const opMonth = new Date(op.timestamp).toISOString().slice(0, 7);
      return opMonth === month;
    });

    const total = monthOps.reduce((sum, op) => sum + parseFloat(op.cost), 0);
    return total.toFixed(4);
  }

  resetCurrentRun() {
    this.currentRun = {
      startTime: Date.now(),
      operations: []
    };
  }
}

module.exports = new CostTracker();
