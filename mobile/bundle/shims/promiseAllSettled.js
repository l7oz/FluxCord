if (typeof Promise.allSettled === "undefined") {
    Promise.allSettled = function (promises: any[]) {
        return Promise.all(promises.map((p: any) => Promise.resolve(p).then((v: any) => ({ status: "fulfilled", value: v }), (e: any) => ({ status: "rejected", reason: e }))));
    };
}
