import Axios from 'axios';
import { merge2Obj, typeOf } from './misc';

export default {
    // 默认值
    appPath: '',
    proxyUrl: '',

    /**
     * 获取应用路径
     * @param {String} url
     */
    getAppPath(url) {
        const { protocol, host } = window.location;
        const webSiteUrl = protocol + '//' + host + this.appPath + '/' + url;
        return webSiteUrl;
    },

    /**
     * 获取proxyUrl
     * @param {*} url
     */
    getProxyUrl(url = '') {
        return this.getAppPath(this.proxyUrl + url);
    },

    /**
     * 获取URL问号后面的值
     * @return 返回指定key的value
     */
    getParam(paramName) {
        let paramValue = null;
        let isFound = false;
        if (window.location.search.indexOf('?') == 0 && window.location.search.indexOf('=') > 1) {
            const arrSource = decodeURIComponent(window.location.search)
                .substring(1, window.location.search.length)
                .split('&');
            let i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf('=') > 0) {
                    if (arrSource[i].split('=')[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split('=')[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    },

    /**
     * 远程调用获取服务器数据
     * @param {String} URL
     * @param {AxiosRequestConfig} opt_options
     */
    async fetch(URL, opt_options = null) {
        URL = String.prototype.trim.call(URL);
        return Axios.request(
            merge2Obj(
                {
                    url: this.getAppPath(URL),
                    method: 'post',
                },
                opt_options
            )
        ).then(res => res.data);
    },

    /**
     * 代理请求
     * @param {String} URL
     * @param {AxiosRequestConfig} opt_options
     */
    async fetchWithPorxy(URL, opt_options = null) {
        URL = String.prototype.trim.call(URL);
        return this.fetch(
            '',
            merge2Obj(
                {
                    url: this.getProxyUrl(URL),
                    method: 'get',
                },
                opt_options
            )
        );
    },

    /**
     * 下载文件
     * @param {*} obj
     * @param {String} fileName
     */
    download(obj, fileName) {
        let blobObj;

        // 字符串文字过大造成的下载bug
        if (typeOf(obj) === 'string') {
            const binStr = atob(obj.split(',')[1] || obj.split(',')[0]),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            obj = new Blob([arr]);
        }

        if (obj instanceof Blob) {
            if (obj.size === 0) {
                throw '文件下载：空数据！';
            }
            blobObj = URL.createObjectURL(obj);
        } else {
            throw '不支持的文件下载！';
        }

        // 兼容Ie（不一定有效）
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blobObj, fileName);
            URL.revokeObjectURL(blobObj);
        }
        // 主流浏览器
        else {
            // 生成a标签，指定文件名
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = blobObj;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            // 释放资源
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
        }
    },
};
