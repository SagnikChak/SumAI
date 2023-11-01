import { useState, useEffect } from "react";

import { copy, link, Aloader, tick, enter } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';
// useLazyGetArticleQuery

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    sourceUrl: "",
    mDesc: "",
    mfavIcon: "",
    mImage: "",
    mLang: "",
    tLang: "",
    titleLang: "",
    tags: [],
    title: "",
    topImage: "",
    summary: "",
    text: "",
    images: [],
  });

  // const [textSummary, setTextSummary] = useState({
  //   summary: "",
  // });

  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  // const [getArticle, { errorA, isAFetching }] = useLazyGetArticleQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.article?.summary || data?.article?.text ) {
      const newArticle = {
        ...article,
        sourceUrl: data.article.source_url,
        mDesc: data.article.meta_description,
        mfavIcon: data.article.meta_favicon,
        mImage: data.article.meta_image,
        mLang: data.article.meta_lang,
        tLang: data.article.text_lang,
        titleLang: data.article.title_lang,
        tags: data.article.tags,
        title: data.article.title,
        topImage: data.article.top_image,
        summary: data.article.summary,
        text: data.article.text,
        images: data.article.images,
      };

      // const dataSummary = await getArticle({ articleText: newArticle.text });
      // if(dataSummary?.data?.summary) {
      //   const newSummary = { ...textSummary, summary: dataSummary.data.summary};
      //   // console.log(newSummary.summary + "\n\n");
      //   setTextSummary(newSummary);
      // }

      console.log(newArticle);
      // console.log(newArticle.text);
      
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => { setCopied(false); }, 3000);
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={link}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-slate-400 peer-focus:text-gray-700"
          >
            <img src={enter} alt="enter" />
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-fauna text-blue-300 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={Aloader}
            alt="loader"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-sora font-bold text-slate-400 text-center">
            Couldnot extract Information...Please try with a different URL!
            <br />
            <span className="font-fauna font-normal text-gray-600">
              {error?.data?.error}
            </span>
          </p>
        ) : article.summary ? (
          article.summary && (
            <div className="flex flex-col gap-3 justify-center md:w-[1000px] w-fit">
              <h2 className="font-sora font-bold text-slate-400 text-xl text-center">
                Article <span className="blue_gradient">Information</span>
              </h2>
              <div className="summary_box md:w-[1000px] w-fit">
                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Source URL:{" "}
                  </span>
                  &nbsp;{article.sourceUrl}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Description:{" "}
                  </span>
                  &nbsp;{article.mDesc}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Favicon:{" "}
                  </span>
                  &nbsp;
                  <img
                    src={article.mfavIcon}
                    alt="image"
                    onClick={() => window.open(article.mfavIcon)}
                    className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                  />
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Image:{" "}
                  </span>
                  &nbsp;
                  <img
                    src={article.mImage}
                    alt="image"
                    onClick={() => window.open(article.mImage)}
                    className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                  />
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Language:{" "}
                  </span>
                  &nbsp;{article.mLang}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Text Language:{" "}
                  </span>
                  &nbsp;{article.tLang}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Title Language:{" "}
                  </span>
                  &nbsp;{article.titleLang}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Title:{" "}
                  </span>
                  &nbsp;{article.title}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Top Image:{" "}
                  </span>
                  &nbsp;
                  <img
                    src={article.topImage}
                    alt="image"
                    onClick={() => window.open(article.topImage)}
                    className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                  />
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Tags:{" "}
                  </span>
                  &nbsp;
                  {article.tags.map((tag, index) => (
                    <span key={`tag-${index}`}>{tag},&nbsp;</span>
                  ))}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Summary:{" "}
                  </span>
                  &nbsp;{article.summary}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <div className="flex flex-wrap justify-center items-center">
                  {article.images.map((image, index) => (
                    <img
                      key={`image-${index}`}
                      src={image}
                      alt="image"
                      onClick={() => window.open(image)}
                      className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          article.text && (
            <div className="flex flex-col gap-3">
              <h2 className="font-sora font-bold text-slate-400 text-xl">
                Article <span className="blue_gradient">Information</span>
              </h2>
              <div className="summary_box md:w-[1000px] w-fit">
                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Source URL:{" "}
                  </span>
                  &nbsp;{article.sourceUrl}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Description:{" "}
                  </span>
                  &nbsp;{article.mDesc}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Favicon:{" "}
                  </span>
                  &nbsp;
                  <img
                    src={article.mfavIcon}
                    alt="image"
                    onClick={() => window.open(article.mfavIcon)}
                    className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                  />
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Image:{" "}
                  </span>
                  &nbsp;
                  <img
                    src={article.mImage}
                    alt="image"
                    onClick={() => window.open(article.mImage)}
                    className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                  />
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Meta Language:{" "}
                  </span>
                  &nbsp;{article.mLang}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Text Language:{" "}
                  </span>
                  &nbsp;{article.tLang}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Title Language:{" "}
                  </span>
                  &nbsp;{article.titleLang}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Title:{" "}
                  </span>
                  &nbsp;{article.title}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Top Image:{" "}
                  </span>
                  &nbsp;
                  <img
                    src={article.topImage}
                    alt="image"
                    onClick={() => window.open(article.topImage)}
                    className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                  />
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora text-sm mb-5">
                  <span className="font-fauna font-extrabold text-md text-blue-300">
                    Tags:{" "}
                  </span>
                  &nbsp;
                  {article.tags.map((tag, index) => (
                    <span key={`tag-${index}`}>{tag},&nbsp;</span>
                  ))}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />

                <p className="text-slate-100 font-sora font-medium text-sm mb-5">
                  Summary: {article.text}
                </p>
                <hr className="border border-slate-300 w-full mb-5" />
                <div className="flex flex-wrap justify-center items-center">
                  {article.images.map((image, index) => (
                    <img
                      key={`image-${index}`}
                      src={image}
                      alt="image"
                      onClick={() => window.open(image)}
                      className="w-[200px] h-[200px] object-contain cursor-pointer px-5 py-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;