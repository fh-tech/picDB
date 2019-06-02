using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace backend_server.Util
{
    public static class LinqExtensions
    {
        public static IEnumerable<IEnumerable<T>> Partition<T>(this IEnumerable<T> source, int size)
        {
            T[] array = null;
            var count = 0;
            foreach (var item in source)
            {
                if (array == null) array = new T[size];
                array[count] = item;
                count++;

                if (count != size) continue;

                yield return new ReadOnlyCollection<T>(array);
                array = null;
                count = 0;
            }

            if (array == null) yield break;

            Array.Resize(ref array, count);
            yield return new ReadOnlyCollection<T>(array);
        }

        public static IEnumerable<T> Tap<T>(this IEnumerable<T> source, Action<T> action)
        {
            foreach (var item in source)
            {
                action(item);
                yield return item;
            }
        }
    }
}
