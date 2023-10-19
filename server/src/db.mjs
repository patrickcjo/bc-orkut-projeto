import sqlite from 'better-sqlite3';

export const db = sqlite('./database.sqlite3');
