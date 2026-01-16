async function ambilData(resource){
    const raw = await fetch(resource)
    const json = raw.json()

    return json
}