import React, { ReactNode } from 'react'
import styles from './Card.module.scss'

export const CategoryCard = ({
                               href, categoryDisplayName, topicSize, problemSize,
                             }: { href: string, categoryDisplayName: string, topicSize: number, problemSize: number }): JSX.Element => {
  return (
    <button className={styles.categoryCard}>
      <h5 className={styles.title}>{categoryDisplayName}</h5>
      {/*TODO 数字の見せ方は要検討*/}
      <div>topic: {topicSize}</div>
      <div>problem: {problemSize}</div>
      <a href={href} className={styles.href} />
    </button>
  )
}
export const PageTextCard = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className={styles.pageTextCard}>
      {children}
    </div>
  )
}
