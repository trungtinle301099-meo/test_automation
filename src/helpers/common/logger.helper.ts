/**
 * Logger utility for Playwright tests.
 * Outputs colored logs to the console to track test execution easily.
 *
 * Usage:
 *   import { logger } from '../helpers/common/logger.helper';
 *   logger.pass('TC-REG-001');
 *   logger.step('Navigating to homepage');
 *   logger.info('User email: test@example.com');
 */

// ANSI color codes
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m';
const RED    = '\x1b[31m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';

const timestamp = (): string => {
  return new Date().toISOString().replace('T', ' ').slice(0, 23);
};

export const logger = {
  /**
   * Logs a passed test case.
   * @param testId - Test case ID, e.g., 'TC-REG-001'
   * @param description - Short test description
   */
  pass(testId: string, description?: string): void {
    const msg = description ? `${testId}: ${description}` : testId;
    console.log(`${BOLD}${GREEN}[PASS] ${msg}${RESET}  ${CYAN}(${timestamp()})${RESET}`);
  },

  /**
   * Logs general info during test execution.
   */
  info(message: string): void {
    console.log(`${CYAN}[INFO] ${message}${RESET}`);
  },

  /**
   * Logs an execution step.
   */
  step(message: string): void {
    console.log(`${YELLOW}[STEP] ${message}${RESET}`);
  },

  /**
   * Logs a failed step or assertion.
   */
  fail(message: string): void {
    console.log(`${RED}[FAIL] ${message}${RESET}`);
  },

  /**
   * Logs completion of a setup / teardown block.
   */
  setup(message: string): void {
    console.log(`${BOLD}${YELLOW}[SETUP] ${message}${RESET}  ${CYAN}(${timestamp()})${RESET}`);
  },
};
