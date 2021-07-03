import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Docs about Natasha project"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <img
            src={useBaseUrl("/images/console.gif")}
            alt="Example banner"
          />
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx("col col--4", styles.feature)}>
                <div className="text--center">
                  <img
                    className={styles.featureImage}
                    src={useBaseUrl("images/concurrency.svg")}
                  />
                </div>
                <h3>
                  <Translate
                    id="homepage.动态构建"
                    description="The homepage 动态构建"
                  >
                    动态构建
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="homepage.动态构建.details"
                    description="The homepage 动态构建Details"
                  >
                    基于 Roslyn 的 C#
                    动态程序集构建库，该库允许开发者在运行时使用 C# 代码构建域 /
                    程序集 / 类 / 结构体 / 枚举 / 接口 /
                    方法等，使得程序在运行的时候可以增加新的模块及功能。
                  </Translate>
                </p>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <div className="text--center">
                  <img
                    className={styles.featureImage}
                    src={useBaseUrl("images/scale-out.svg")}
                  />
                </div>
                <h3>
                  <Translate
                    id="homepage.安全可控"
                    description="The homepage 安全可控"
                  >
                    安全可控
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="homepage.安全可控.details"
                    description="The homepage 安全可控details"
                  >
                    Natasha
                    集成了域管理/插件管理，可以实现域隔离，域卸载，热拔插等功能。
                  </Translate>
                </p>
              </div>
              <div className={clsx("col col--4", styles.feature)}>
                <div className="text--center">
                  <img
                    className={styles.featureImage}
                    src={useBaseUrl("images/full-lifetime.svg")}
                  />
                </div>
                <h3>
                  <Translate
                    id="homepage.全面易用"
                    description="The homepage 全面易用"
                  >
                    全面易用
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="homepage.全面易用.details"
                    description="The homepage 全面易用Details"
                  >
                    该库遵循完整的编译流程，提供完整的错误提示，
                    可自动添加引用，完善的数据结构构建模板让开发者只专注于程序集脚本的编写，兼容
                    netcoreapp2.0+ / netcoreapp3.0+, 跨平台，统一、简便的链式
                    API。
                  </Translate>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
