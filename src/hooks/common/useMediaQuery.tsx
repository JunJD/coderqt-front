import { useState, useEffect } from 'react';

/**
 * 这是一个自定义的hook，用于监听媒体查询的变化，比如：(min-width: 600px) and (max-width: 900px)
 * @param query 媒体查询表达式，比如：(min-width: 600px) and (max-width: 900px)
 * @returns
 */
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // matchMedia是一个函数，接受一个字符串参数，返回一个MediaQueryList对象，该对象有一个matches属性，表示当前媒体查询是否匹配。
        // 字符传应该是一个媒体查询表达式，比如：(min-width: 600px) and (max-width: 900px)
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => {
            setMatches(media.matches);
        };

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query, matches]);

    return matches;
}

export default useMediaQuery;
