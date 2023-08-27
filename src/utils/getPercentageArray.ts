

export function getPercentageArray(items: number[]): number[] {
    // Recebe um array de números e retorna um array de números na mesma sequência e valores percentuais correspondentes
    const total = items.reduce((partial, current) => partial + current);
    let itemsPercentage: number[] = [];

    items.map(item => {
        itemsPercentage = [...itemsPercentage, Number((100 * item / total).toFixed(2))]
    })

    return itemsPercentage

}